const HuggingFaceService = require('../ai/huggingfaceService');
const config = require('../config/config');

class AIHandler {
    constructor() {
        this.huggingface = new HuggingFaceService();
        this.userSessions = new Map(); // Track user AI sessions
    }

    // Check jika user sedang dalam mode AI chat
    isInAIMode(userId) {
        const session = this.userSessions.get(userId);
        return session?.mode === config.userStates.AI_CHAT;
    }

    // Set user ke mode AI chat
    setAIMode(userId, enabled = true) {
        if (enabled) {
            this.userSessions.set(userId, {
                mode: config.userStates.AI_CHAT,
                startTime: new Date(),
                messageCount: 0
            });
        } else {
            this.userSessions.delete(userId);
            this.huggingface.clearHistory(userId);
        }
    }

    // Check if message is an exit command
    isExitCommand(message) {
        const lowerMessage = message.toLowerCase().trim();
        const exitCommands = [
            '/menu', 'menu', '/exit', 'exit', 
            'keluar', '/keluar', 'kembali', '/kembali',
            'back', '/back', 'quit', '/quit'
        ];
        return exitCommands.includes(lowerMessage);
    }

    // Handle exit from AI mode
    handleExitCommand(userId) {
        this.setAIMode(userId, false);
        return {
            success: true,
            message: config.messages.mainMenu,
            shouldContinue: false,
            exitToMenu: true
        };
    }

    // Handle AI command (/ai atau /chat)
    async handleAICommand(userId) {
        this.setAIMode(userId, true);
        
        // Test koneksi ke Hugging Face
        const connectionTest = await this.huggingface.testConnection();
        
        let message = config.messages.aiMenu;
        
        if (!connectionTest.success) {
            message += `\n\n⚠️ ${connectionTest.message}`;
        }
        
        return {
            success: true,
            message: message,
            shouldContinue: false
        };
    }

    // Handle model selection command
    async handleModelCommand(userId) {
        if (!this.isInAIMode(userId)) {
            return {
                success: false,
                message: '❌ Aktifkan mode AI dulu dengan mengetik /ai'
            };
        }

        const modelListMessage = this.huggingface.getModelListMessage(userId);
        
        return {
            success: true,
            message: modelListMessage,
            shouldContinue: false
        };
    }

    // Handle model selection (1, 2, 3)
    async handleModelSelection(userId, selection) {
        const modelKeys = Object.keys(config.huggingface.models);
        const selectedIndex = parseInt(selection) - 1;
        
        if (selectedIndex >= 0 && selectedIndex < modelKeys.length) {
            const modelKey = modelKeys[selectedIndex];
            this.huggingface.setUserModel(userId, modelKey);
            
            const modelName = modelKey.toUpperCase();
            const description = this.huggingface.getModelDescription(modelKey);
            
            return {
                success: true,
                message: `✅ Model berhasil diganti ke: *${modelName}*\n${description}\n\nSekarang kamu bisa mulai chat! 💬`,
                shouldContinue: false
            };
        }
        
        return {
            success: false,
            message: '❌ Pilihan tidak valid. Pilih angka 1-3 atau ketik /model untuk melihat daftar model.'
        };
    }

    // Handle AI chat message
    async handleChatMessage(userId, message) {
        try {
            // Update session info
            const session = this.userSessions.get(userId);
            if (session) {
                session.messageCount += 1;
                session.lastActivity = new Date();
            }

            // Kirim ke Hugging Face
            const aiResult = await this.huggingface.chat(userId, message);
            
            if (aiResult.success) {
                // Format respons dengan info model
                const currentModel = this.huggingface.getUserModel(userId);
                const modelKey = Object.keys(config.huggingface.models)
                    .find(key => config.huggingface.models[key] === currentModel) || 'default';
                
                let response = aiResult.response;
                
                // Tambah signature bot (opsional)
                if (Math.random() < 0.1) { // 10% chance
                    response += `\n\n_🤖 ${modelKey.toUpperCase()} AI_`;
                }
                
                return {
                    success: true,
                    message: response,
                    shouldContinue: true
                };
            } else {
                return {
                    success: false,
                    message: aiResult.error || config.messages.aiError
                };
            }

        } catch (error) {
            console.error('AI Handler Error:', error);
            return {
                success: false,
                message: config.messages.aiError
            };
        }
    }

    // Handle special AI commands
    async handleSpecialCommands(userId, message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Clear history command
        if (lowerMessage === '/clear' || lowerMessage === 'clear') {
            this.huggingface.clearHistory(userId);
            return {
                success: true,
                message: '🗑️ History percakapan telah dihapus. Mulai fresh!',
                shouldContinue: false
            };
        }
        
        // AI stats command
        if (lowerMessage === '/stats' || lowerMessage === 'stats') {
            const stats = this.huggingface.getStats();
            const session = this.userSessions.get(userId);
            
            let statsMessage = `📊 *STATISTIK AI*\n\n`;
            statsMessage += `👥 Total pengguna AI: ${stats.totalUsers}\n`;
            statsMessage += `💬 Total percakapan: ${stats.totalConversations}\n`;
            statsMessage += `🟢 Pengguna aktif: ${stats.activeUsers}\n`;
            
            if (session) {
                const sessionDuration = Math.floor((Date.now() - session.startTime) / 500 / 30);
                statsMessage += `\n*Sesi Anda:*\n`;
                statsMessage += `⏰ Durasi: ${sessionDuration} menit\n`;
                statsMessage += `📝 Pesan dikirim: ${session.messageCount}`;
            }
            
            return {
                success: true,
                message: statsMessage,
                shouldContinue: false
            };
        }

        // Help command dalam mode AI
        if (lowerMessage === '/help' || lowerMessage === 'help') {
            return {
                success: true,
                message: config.messages.aiHelp,
                shouldContinue: false
            };
        }

        return null; // Bukan special command
    }

    // Main handler untuk semua AI-related messages
    async handle(userId, message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Handle AI activation commands
        if (config.commands.ai.includes(lowerMessage)) {
            return await this.handleAICommand(userId);
        }

        // Handle model command
        if (lowerMessage === '/model' || lowerMessage === 'model') {
            return await this.handleModelCommand(userId);
        }

        // Jika user dalam mode AI
        if (this.isInAIMode(userId)) {
            // PRIORITAS PERTAMA: Check exit commands sebelum processing lainnya
            if (this.isExitCommand(message)) {
                return this.handleExitCommand(userId);
            }

            // Handle special commands
            const specialResult = await this.handleSpecialCommands(userId, message);
            if (specialResult) {
                return specialResult;
            }

            // Handle model selection
            if (/^[1-3]$/.test(message.trim())) {
                return await this.handleModelSelection(userId, message.trim());
            }

            // Handle regular chat message
            return await this.handleChatMessage(userId, message);
        }

        return null; // Not an AI command and user not in AI mode
    }

    // Get session info for a user
    getSessionInfo(userId) {
        const session = this.userSessions.get(userId);
        if (!session) return null;

        return {
            mode: session.mode,
            startTime: session.startTime,
            messageCount: session.messageCount,
            lastActivity: session.lastActivity,
            isActive: this.isInAIMode(userId)
        };
    }

    // Get all active AI sessions
    getActiveSessions() {
        return Array.from(this.userSessions.entries()).map(([userId, session]) => ({
            userId,
            ...session
        }));
    }

    // Cleanup inactive sessions (dipanggil secara berkala)
    cleanupInactiveSessions() {
        const now = Date.now();
        const inactiveThreshold = 30 * 60 * 1000; // 30 menit

        for (const [userId, session] of this.userSessions.entries()) {
            const lastActivity = session.lastActivity || session.startTime;
            if (now - lastActivity.getTime() > inactiveThreshold) {
                console.log(`🧹 Cleaning up inactive AI session for ${userId}`);
                this.setAIMode(userId, false);
            }
        }
    }
}

module.exports = AIHandler;