const axios = require('axios');
const config = require('../config/config');

class HuggingFaceService {
    constructor() {
        this.apiKey = config.huggingface.apiKey;
        this.baseUrl = config.huggingface.apiUrl;
        this.conversationHistory = new Map(); // Menyimpan history percakapan per user
        this.userModels = new Map(); // Menyimpan model yang dipilih per user
        this.rateLimiter = new Map(); // Rate limiting per user
    }

    // Setup headers untuk API request
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'WhatsApp-AI-Bot/1.0'
        };
    }

    // Rate limiting - maksimal 10 request per menit per user
    checkRateLimit(userId) {
        const now = Date.now();
        const userRequests = this.rateLimiter.get(userId) || [];
        
        // Hapus request yang lebih dari 1 menit
        const validRequests = userRequests.filter(time => now - time < 60000);
        
        if (validRequests.length >= 10) {
            return false; // Rate limit exceeded
        }
        
        validRequests.push(now);
        this.rateLimiter.set(userId, validRequests);
        return true;
    }

    // Dapatkan model yang aktif untuk user
    getUserModel(userId) {
        return this.userModels.get(userId) || config.huggingface.models.default;
    }

    // Set model untuk user
    setUserModel(userId, modelName) {
        const availableModels = Object.keys(config.huggingface.models);
        if (availableModels.includes(modelName)) {
            this.userModels.set(userId, config.huggingface.models[modelName]);
            return true;
        }
        return false;
    }

    // Dapatkan history percakapan user
    getConversationHistory(userId) {
        return this.conversationHistory.get(userId) || [];
    }

    // Tambah ke history percakapan
    addToHistory(userId, userMessage, aiResponse) {
        const history = this.getConversationHistory(userId);
        
        // Batasi history maksimal 10 exchange terakhir
        if (history.length >= 10) {
            history.shift(); // Hapus yang paling lama
        }
        
        history.push({
            user: userMessage,
            ai: aiResponse,
            timestamp: new Date()
        });
        
        this.conversationHistory.set(userId, history);
    }

    // Bersihkan history percakapan user
    clearHistory(userId) {
        this.conversationHistory.delete(userId);
    }

    // Buat context dari history untuk model
    buildContext(userId, currentMessage) {
        const history = this.getConversationHistory(userId);
        let context = '';
        
        // Tambahkan beberapa exchange terakhir sebagai context
        const recentHistory = history.slice(-3); // 3 exchange terakhir
        
        for (const exchange of recentHistory) {
            context += `Human: ${exchange.user}\nAssistant: ${exchange.ai}\n`;
        }
        
        context += `Human: ${currentMessage}\nAssistant:`;
        return context;
    }

    // Chat dengan AI menggunakan Hugging Face
    async chat(userId, message) {
        console.log("💡 [DEBUG] API Key saat chat():", this.apiKey);

        try {
            // Check rate limit
            if (!this.checkRateLimit(userId)) {
                return {
                    success: false,
                    error: '⏱️ Terlalu banyak pesan! Tunggu sebentar ya (maksimal 10 pesan per menit)'
                };
            }

            // Validasi API key
            if (!this.apiKey || this.apiKey === 'your-huggingface-token-here') {
                return {
                    success: false,
                    error: '🔑 API Key Hugging Face belum dikonfigurasi'
                };
            }

            const model = this.getUserModel(userId);
            const context = this.buildContext(userId, message);

            // Prepare request payload
            const payload = {
                inputs: context,
                parameters: {
                    max_new_tokens: config.huggingface.maxTokens,
                    temperature: config.huggingface.temperature,
                    do_sample: true,
                    return_full_text: false
                },
                options: {
                    wait_for_model: true
                }
            };

            console.log(`🤖 Sending request to AI model: ${model}`);
            
            const response = await axios.post(
                `${this.baseUrl}${model}`,
                payload,
                {
                    headers: this.getHeaders(),
                    timeout: 30000 // 30 detik timeout
                }
            );

            // Handle different response formats
            let aiResponse = '';
            
            if (Array.isArray(response.data)) {
                // Format array response
                aiResponse = response.data[0]?.generated_text || 'Maaf, AI tidak memberikan respons.';
            } else if (response.data.generated_text) {
                // Format object response
                aiResponse = response.data.generated_text;
            } else {
                aiResponse = 'Maaf, format respons AI tidak dikenali.';
            }

            // Clean up response
            aiResponse = this.cleanResponse(aiResponse, context);
            
            // Simpan ke history
            this.addToHistory(userId, message, aiResponse);

            console.log(`✅ AI Response sent to ${userId}`);

            return {
                success: true,
                response: aiResponse,
                model: model
            };

        } catch (error) {
            console.error('❌ Hugging Face API Error:', error.message);
            
            let errorMessage = '🤖 Maaf, AI sedang sibuk. Coba lagi dalam beberapa saat.';
            
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                
                if (status === 401) {
                    errorMessage = '🔑 API Key tidak valid atau expired.';
                } else if (status === 429) {
                    errorMessage = '⏱️ Terlalu banyak request. Tunggu sebentar ya.';
                } else if (status === 503) {
                    errorMessage = '🔄 Model sedang loading. Coba lagi dalam 20 detik.';
                } else if (data?.error) {
                    errorMessage = `🚫 Error: ${data.error}`;
                }
            } else if (error.code === 'ECONNABORTED') {
                errorMessage = '⏰ Request timeout. AI terlalu lama merespons.';
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    }

    // Bersihkan respons AI dari context yang tidak perlu
    cleanResponse(response, context) {
        // Hapus context yang mungkin ikut dalam response
        if (response.includes('Human:') || response.includes('Assistant:')) {
            const lines = response.split('\n');
            const cleanLines = lines.filter(line => 
                !line.trim().startsWith('Human:') && 
                !line.trim().startsWith('Assistant:') &&
                line.trim().length > 0
            );
            response = cleanLines.join('\n').trim();
        }

        // Hapus karakter yang tidak diinginkan
        response = response.replace(/^\s*[\[\(\{].*?[\]\)\}]\s*/, ''); // Hapus bracket di awal
        response = response.replace(/\s*\.{3,}\s*$/, ''); // Hapus ellipsis di akhir
        response = response.trim();

        // Jika response kosong atau terlalu pendek, berikan respons default
        if (!response || response.length < 3) {
            response = 'Maaf, saya tidak bisa memberikan respons yang tepat untuk itu. Bisa coba tanya yang lain?';
        }

        // Batasi panjang respons
        if (response.length > 1000) {
            response = response.substring(0, 997) + '...';
        }

        return response;
    }

    // Dapatkan list model yang tersedia
    getAvailableModels() {
        return Object.keys(config.huggingface.models).map(key => ({
            name: key,
            model: config.huggingface.models[key],
            description: this.getModelDescription(key)
        }));
    }

    // Deskripsi model
    getModelDescription(modelKey) {
        const descriptions = {
            default: '💬 Model standar untuk percakapan umum',
            creative: '🎨 Model kreatif untuk cerita dan ide',
            smart: '🧠 Model pintar untuk pertanyaan kompleks'
        };
        return descriptions[modelKey] || '🤖 Model AI';
    }

    // Generate respons untuk command model
    getModelListMessage(userId) {
        const currentModel = this.getUserModel(userId);
        const models = this.getAvailableModels();
        
        let message = '🤖 *PILIH MODEL AI*\n\n';
        
        models.forEach((model, index) => {
            const isActive = config.huggingface.models[model.name] === currentModel;
            const status = isActive ? '✅' : '⚪';
            message += `${status} ${index + 1}. ${model.name.toUpperCase()}\n${model.description}\n\n`;
        });
        
        message += 'Ketik angka (1-3) untuk ganti model\nAtau ketik /chat untuk kembali ke mode chat';
        
        return message;
    }

    // Test koneksi ke Hugging Face
    async testConnection() {
        try {
            const response = await axios.get('https://huggingface.co/api/models', {
                headers: { 'User-Agent': 'WhatsApp-AI-Bot/1.0' },
                timeout: 5000
            });
            
            return {
                success: true,
                message: '✅ Koneksi ke Hugging Face berhasil'
            };
        } catch (error) {
            return {
                success: false,
                message: '❌ Tidak bisa terhubung ke Hugging Face'
            };
        }
    }

    // Statistik penggunaan AI
    getStats() {
        const totalUsers = this.conversationHistory.size;
        const totalConversations = Array.from(this.conversationHistory.values())
            .reduce((total, history) => total + history.length, 0);
        
        return {
            totalUsers,
            totalConversations,
            activeUsers: this.rateLimiter.size
        };
    }
}

module.exports = HuggingFaceService;