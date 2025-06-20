const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    downloadMediaMessage
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config/config');
const AIHandler = require('../handlers/aihandler');
const StickerMaker = require('../handlers/stickermaker');
const QuoteGenerator = require('../handlers/quote');

class WhatsAppClient {
    constructor() {
    this.sock = null;
    this.userStates = new Map(); // Menyimpan state user
    this.aiHandler = new AIHandler(); // AI Handler
    this.stickerMaker = new StickerMaker(); // Sticker Maker
    this.quoteGenerator = new QuoteGenerator(); // TAMBAHAN BARU - Quote Generator
    this.setupCleanupInterval();
}


    async initialize() {
        try {
            // Pastikan folder sessions ada
            await fs.ensureDir(config.folders.sessions);
            
            // Setup auth state
            const { state, saveCreds } = await useMultiFileAuthState(config.folders.sessions);
            
            // Get latest Baileys version
            const { version, isLatest } = await fetchLatestBaileysVersion();
            console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`);

            // Create socket
            this.sock = makeWASocket({
                version,
                auth: state,
                printQRInTerminal: false, // Kita akan handle QR sendiri
                defaultQueryTimeoutMs: 60000,
            });

            // Event handlers
            this.setupEventHandlers(saveCreds);

            return this.sock;

        } catch (error) {
            console.error('Error initializing WhatsApp client:', error);
            throw error;
        }
    }

    setupEventHandlers(saveCreds) {
        // Connection update
        this.sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('\n📱 Scan QR Code berikut untuk login:');
                qrcode.generate(qr, { small: true });
                console.log('\nBuka WhatsApp di HP > Pengaturan > Perangkat Tertaut > Tautkan Perangkat');
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
                
                if (shouldReconnect) {
                    this.initialize();
                }
            } else if (connection === 'open') {
                console.log('✅ WhatsApp Bot terhubung!');
                console.log('🤖 Bot siap menerima pesan dengan fitur AI Chat dan Sticker Maker...\n');
            }
        });

        // Save credentials
        this.sock.ev.on('creds.update', saveCreds);

        // Handle messages
        this.sock.ev.on('messages.upsert', async (m) => {
            try {
                await this.handleMessage(m);
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });
    }

    async handleMessage(m) {
        const messages = m.messages;
        if (!messages || messages.length === 0) return;

        for (const message of messages) {
            // Skip jika pesan dari bot sendiri
            if (message.key.fromMe) continue;
            
            const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
            const sender = message.key.remoteJid;
            
            // Check if message has media
            const hasMedia = message.message?.imageMessage || 
                            message.message?.videoMessage || 
                            message.message?.stickerMessage ||
                            message.message?.documentMessage;
            
            console.log(`📨 Pesan dari ${sender}: ${text} ${hasMedia ? '[Media]' : ''}`);

            await this.processMessage(sender, text, message);
        }
    }

    async processMessage(sender, text, message) {
        const lowerText = text.toLowerCase().trim();

        try {
            // Cek apakah ini command AI terlebih dahulu
            const aiResult = await this.aiHandler.handle(sender, text);
            if (aiResult) {
                // Kirim thinking message jika diperlukan
                if (aiResult.shouldContinue && aiResult.success) {
                    await this.sendMessage(sender, config.messages.aiThinking);
                }
                
                await this.sendMessage(sender, aiResult.message);
                return;
            }

            // Command /sticker
            if (config.commands.sticker.includes(lowerText)) {
                this.setUserState(sender, config.userStates.STICKER_MAKER);
                await this.sendMessage(sender, config.messages.stickerMenu);
                return;
            }
            // Command /quote
            if (config.commands.quote.includes(lowerText)) {
        this.setUserState(sender, config.userStates.QUOTE_GENERATOR);
        await this.sendMessage(sender, config.messages.quoteMenu);
        return;
            }
            // Command /start atau /menu
            if (config.commands.start.includes(lowerText) || config.commands.menu.includes(lowerText)) {
                this.setUserState(sender, config.userStates.MAIN_MENU);
                await this.sendMessage(sender, config.messages.mainMenu);
                return;
            }

            // Command /help
            if (config.commands.help.includes(lowerText)) {
                await this.sendMessage(sender, config.messages.help);
                return;
            }

            // Command /info
            if (config.commands.info.includes(lowerText)) {
                await this.sendMessage(sender, config.messages.info);
                return;
            }

            // Handle main menu selection
            const userState = this.getUserState(sender);
            
            if (userState === config.userStates.MAIN_MENU) {
                await this.handleMainMenuSelection(sender, text);
                return;
            }

            // Handle TikTok download mode
            if (userState === config.userStates.QUICK_TIKTOK) {
                await this.handleTikTokDownloadMode(sender, text);
                return;
            }

            // Handle Sticker Maker mode
            if (userState === config.userStates.STICKER_MAKER) {
                await this.handleStickerMakerMode(sender, text, message);
                return;
            }
            // Handle Quote Generator mode
            if (userState === config.userStates.QUOTE_GENERATOR) {
            await this.handleQuoteGeneratorMode(sender, text);
            return;
            }

            // Jika user belum memilih dari menu utama
            if (!userState) {
                await this.sendMessage(sender, config.messages.welcome);
                await this.sendMessage(sender, config.messages.mainMenu);
                this.setUserState(sender, config.userStates.MAIN_MENU);
                return;
            }

            // Default response
            await this.sendMessage(sender, config.messages.selectCategory);

        } catch (error) {
            console.error('Error processing message:', error);
            await this.sendMessage(sender, config.messages.error);
        }
    }

    async handleQuoteGeneratorMode(sender, text) {
    const lowerText = text.toLowerCase().trim();

    // Kembali ke menu utama
    if (config.commands.menu.includes(lowerText)) {
        this.setUserState(sender, config.userStates.MAIN_MENU);
        await this.sendMessage(sender, config.messages.mainMenu);
        return;
    }

    // Command help khusus quote
    if (lowerText === '/help' || lowerText === 'help') {
        await this.sendMessage(sender, config.messages.quoteHelp || config.messages.help);
        return;
    }

    // Handle pilihan quote (1, 2, 3)
    const choice = text.trim();
    
    if (['1', '2', '3'].includes(choice)) {
        await this.processQuoteGeneration(sender, choice);
        return;
    }

    // Jika pilihan tidak valid
    await this.sendMessage(sender, '❌ Pilihan tidak valid. Pilih angka 1-3');
    await this.sendMessage(sender, config.messages.quoteMenu);
}

// TAMBAHAN METHOD BARU - processQuoteGeneration
async processQuoteGeneration(sender, choice) {
    try {
        // Kirim pesan loading
        await this.sendMessage(sender, '⏳ Sedang mengambil quote...');

        // Generate quote berdasarkan pilihan
        const result = this.quoteGenerator.handleQuoteRequest(choice);

        if (result.success) {
            // Kirim quote yang sudah diformat
            await this.sendMessage(sender, result.formatted);
            
            // Kirim menu untuk generate lagi
            setTimeout(async () => {
                await this.sendMessage(sender, '\n✨ Ingin quote lagi?\n\n' + config.messages.quoteMenu);
            }, 1000);

        } else {
            await this.sendMessage(sender, result.error || config.messages.quoteError);
            await this.sendMessage(sender, config.messages.quoteMenu);
        }

    } catch (error) {
        console.error('Error processing quote generation:', error);
        await this.sendMessage(sender, config.messages.quoteError);
        await this.sendMessage(sender, config.messages.quoteMenu);
    }
}

    async handleMainMenuSelection(sender, text) {
        const selection = text.trim();

        switch (selection) {
            case '1':
                // TikTok Downloader (langsung quick mode)
                this.setUserState(sender, config.userStates.QUICK_TIKTOK);
                await this.sendMessage(sender, config.messages.tiktokMenu);
                break;
                
            case '2':
                // AI Chat - delegate to AI handler
                const aiResult = await this.aiHandler.handleAICommand(sender);
                await this.sendMessage(sender, aiResult.message);
                break;
                
            case '3':
                // Help & Info
                await this.sendMessage(sender, config.messages.help);
                await this.sendMessage(sender, config.messages.info);
                break;
                
            case '4':
                // Sticker Maker
                this.setUserState(sender, config.userStates.STICKER_MAKER);
                await this.sendMessage(sender, config.messages.stickerMenu);
                break;
                
            case '5':
            // TAMBAHAN BARU - Quote Generator
            this.setUserState(sender, config.userStates.QUOTE_GENERATOR);
            await this.sendMessage(sender, config.messages.quoteMenu);
            break;
            
        default:
            await this.sendMessage(sender, config.messages.invalidCategory);
            await this.sendMessage(sender, config.messages.mainMenu);
        }
    }

    // Method baru untuk handle TikTok download (menggabungkan logic quick mode)
    async handleTikTokDownloadMode(sender, text) {
        const lowerText = text.toLowerCase().trim();

        // Kembali ke menu utama
        if (config.commands.menu.includes(lowerText)) {
            this.setUserState(sender, config.userStates.MAIN_MENU);
            await this.sendMessage(sender, config.messages.mainMenu);
            return;
        }

        // Validasi link TikTok langsung
        if (config.tiktokRegex.test(text)) {
            // Set kategori default untuk download
            const defaultCategory = 'Video tiktok'; // kategori default
            await this.processTikTokDownload(sender, text, defaultCategory);
            return;
        }

        // Jika bukan link TikTok yang valid
        await this.sendMessage(sender, config.messages.invalidLink);
        await this.sendMessage(sender, config.messages.tiktokMenu);
    }

    // Method baru untuk handle Sticker Maker mode
    async handleStickerMakerMode(sender, text, message) {
        const lowerText = text.toLowerCase().trim();

        // Kembali ke menu utama
        if (config.commands.menu.includes(lowerText)) {
            this.setUserState(sender, config.userStates.MAIN_MENU);
            await this.sendMessage(sender, config.messages.mainMenu);
            return;
        }

        // Command help khusus sticker
        if (lowerText === '/help' || lowerText === 'help') {
            await this.sendMessage(sender, config.messages.stickerHelp);
            return;
        }

        // Check if message has media
        const imageMessage = message.message?.imageMessage;
        const videoMessage = message.message?.videoMessage;
        const stickerMessage = message.message?.stickerMessage;
        const documentMessage = message.message?.documentMessage;

        if (imageMessage || videoMessage || stickerMessage || documentMessage) {
            await this.processStickerCreation(sender, message);
            return;
        }

        // Jika tidak ada media yang dikirim
        await this.sendMessage(sender, config.messages.noMediaReceived);
        await this.sendMessage(sender, config.messages.stickerMenu);
    }

    async processStickerCreation(sender, message) {
        try {
            // Kirim pesan loading
            await this.sendMessage(sender, config.messages.processingSticker);

            // Download media
            const mediaData = await this.downloadMedia(message);
            
            if (!mediaData) {
                await this.sendMessage(sender, config.messages.stickerError);
                return;
            }

            // Validate media
            const validation = await this.stickerMaker.validateMedia(mediaData.buffer, mediaData.mimetype);
            
            if (!validation.isValid) {
                const errorMessage = validation.errors.join('\n');
                await this.sendMessage(sender, `❌ ${errorMessage}`);
                return;
            }

            // Create sticker
            const result = await this.stickerMaker.createSticker(mediaData.buffer, mediaData.mimetype);

            if (result.success) {
                // Send sticker
                await this.sendSticker(sender, result.filePath);
                
                // Hapus file setelah kirim
                setTimeout(async () => {
                    try {
                        await fs.remove(result.filePath);
                        console.log(`File sticker ${result.fileName} telah dihapus`);
                    } catch (err) {
                        console.error('Error deleting sticker file:', err);
                    }
                }, 60000); // Hapus setelah 1 menit

                // Pesan sukses dan instruksi
                await this.sendMessage(sender, `${config.messages.stickerSuccess}\n\n🎨 Kirim gambar/video lain atau ketik /menu untuk kembali`);

            } else {
                await this.sendMessage(sender, result.error || config.messages.stickerError);
            }

        } catch (error) {
            console.error('Error processing sticker creation:', error);
            await this.sendMessage(sender, config.messages.stickerError);
        }
    }

    async downloadMedia(message) {
        try {
            const mediaMessage = message.message?.imageMessage || 
                                message.message?.videoMessage || 
                                message.message?.stickerMessage ||
                                message.message?.documentMessage;

            if (!mediaMessage) {
                return null;
            }

            // Get mimetype
            const mimetype = mediaMessage.mimetype || 'application/octet-stream';

            // Download media buffer
            const buffer = await downloadMediaMessage(message, 'buffer', {});

            return {
                buffer: buffer,
                mimetype: mimetype,
                filename: mediaMessage.filename || 'media'
            };

        } catch (error) {
            console.error('Error downloading media:', error);
            return null;
        }
    }

    async processTikTokDownload(sender, url, category) {
        try {
            // Kirim pesan loading
            await this.sendMessage(sender, config.messages.processing);

            // Import TikTokDownloader
            const TikTokDownloader = require('../tiktok/tiktokDownloader');
            const downloader = new TikTokDownloader();

            // Process download
            const result = await downloader.processDownload(url, category);

            if (result.success) {
                // Kirim video
                await this.sendVideo(sender, result.filePath, result.title, result.author);
                
                // Hapus file setelah kirim (opsional)
                setTimeout(async () => {
                    try {
                        await fs.remove(result.filePath);
                        console.log(`File ${result.fileName} telah dihapus`);
                    } catch (err) {
                        console.error('Error deleting file:', err);
                    }
                }, 60000); // Hapus setelah 1 menit

                // Reset state untuk download lagi
                await this.sendMessage(sender, '\n📹 Kirim link TikTok lain atau ketik /menu untuk kembali');

            } else {
                await this.sendMessage(sender, result.error || config.messages.error);
            }

        } catch (error) {
            console.error('Error processing TikTok download:', error);
            await this.sendMessage(sender, config.messages.error);
        }
    }

    // User state management
    getUserState(sender) {
        const userData = this.userStates.get(sender);
        return userData?.state;
    }

    setUserState(sender, state) {
        const userData = this.userStates.get(sender) || {};
        userData.state = state;
        userData.lastActivity = new Date();
        this.userStates.set(sender, userData);
    }

    getUserCategory(sender) {
        const userData = this.userStates.get(sender);
        return userData?.category;
    }

    setUserCategory(sender, category) {
        const userData = this.userStates.get(sender) || {};
        userData.category = category;
        this.userStates.set(sender, userData);
    }

    // Setup cleanup interval
    setupCleanupInterval() {
        // Cleanup inactive sessions setiap 30 menit
        setInterval(() => {
            this.cleanupInactiveUsers();
            this.aiHandler.cleanupInactiveSessions();
            this.stickerMaker.cleanup(); // Cleanup sticker files
        }, 30 * 60 * 1000);
    }

    cleanupInactiveUsers() {
        const now = Date.now();
        const inactiveThreshold = 60 * 60 * 1000; // 1 jam

        for (const [userId, userData] of this.userStates.entries()) {
            const lastActivity = userData.lastActivity || new Date();
            if (now - lastActivity.getTime() > inactiveThreshold) {
                console.log(`🧹 Cleaning up inactive user session: ${userId}`);
                this.userStates.delete(userId);
            }
        }
    }

    async sendMessage(jid, text) {
        try {
            await this.sock.sendMessage(jid, { text: text });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    async sendVideo(jid, filePath, title, author) {
        try {
            const videoBuffer = await fs.readFile(filePath);
            const caption = `🎬 *${title}*\n👤 By: ${author}\n\n✅ Video berhasil didownload tanpa watermark!`;

            await this.sock.sendMessage(jid, {
                video: videoBuffer,
                caption: caption,
                mimetype: 'video/mp4'
            });

            console.log(`✅ Video berhasil dikirim ke ${jid}`);

        } catch (error) {
            console.error('Error sending video:', error);
            throw error;
        }
    }

    async sendSticker(jid, filePath) {
        try {
            const stickerBuffer = await fs.readFile(filePath);

            await this.sock.sendMessage(jid, {
                sticker: stickerBuffer,
                mimetype: 'image/webp'
            });

            console.log(`✅ Sticker berhasil dikirim ke ${jid}`);

        } catch (error) {
            console.error('Error sending sticker:', error);
            throw error;
        }
    }

    // Get statistics
    getStats() {
    const aiStats = this.aiHandler.aiHandler?.getStats() || {};
    const activeSessions = this.aiHandler.getActiveSessions().length;
    const quoteStats = this.quoteGenerator.getStats(); // TAMBAHAN BARU
    
    return {
        totalUsers: this.userStates.size,
        activeAISessions: activeSessions,
        aiStats: aiStats,
        supportedStickerFormats: this.stickerMaker.constructor.getSupportedFormats(),
        quoteStats: quoteStats // TAMBAHAN BARU
    };
}
}

module.exports = WhatsAppClient;