// Konfigurasi bot
const config = {
    
    // Folder untuk menyimpan file
    folders: {
        downloads: './downloads',
        temp: './temp',
        sessions: './sessions',
        stickers: './stickers'
    },
 
    
    // Hugging Face Configuration
   huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY,
    apiUrl: 'https://api-inference.huggingface.co/models/',
    models: {
        default: 'HuggingFaceH4/zephyr-7b-beta',
        creative: 'bigscience/bloom-7b1',
        smart: 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO'
    },
    maxTokens: 150,
    temperature: 0.7
},
    
    // Kategori video yang tersedia (masih bisa digunakan untuk default category)
    categories: {
        '1': 'Video tiktok',
        '2': 'Edukasi', 
        '3': 'Olahraga',
        '4': 'Musik',
        '5': 'Kuliner',
        '6': 'Tutorial',
        '7': 'Lainnya'
    },
    
    // Bot commands
    commands: {
        menu: ['/menu', 'menu'],
        start: ['/start', 'start'],
        ai: ['/ai', 'ai', '/chat', 'chat'],
        help: ['/help', 'help'],
        info: ['/info', 'info'],
        sticker: ['/sticker', 'sticker', '/s', 's'],
          quote: ['/quote', 'quote', '/q', 'q'],
        exit: ['/menu', 'menu', '/exit', 'exit', 'keluar', '/keluar', 'kembali', '/kembali']
    },
    
    // Sticker configuration
    sticker: {
        maxSize: 1024 * 1024 * 5, // 5MB max file size
        quality: 100,
        packname: 'WhatsApp Bot',
        author: 'Igimonsan Bot',
        supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm'],
        maxDuration: 10 // seconds for video stickers
    },
    
    // Pesan bot
    messages: {
        welcome: `🤖 *TikTok Downloader & AI Chat Bot*\n\nSelamat datang! Bot ini dapat:\n📹 Download video TikTok tanpa watermark\n🤖 Chat dengan AI\n🎨 Membuat sticker dari gambar/video\n\n*Perintah yang tersedia:*\n/menu - Lihat menu utama\n/ai - Chat dengan AI\n/sticker - Buat sticker\n/help - Bantuan\n/info - Info bot`,
        
         mainMenu: `🏠 *MENU UTAMA*\n\n1️⃣ Download TikTok ⚡\n2️⃣ Chat AI 🤖\n3️⃣ Help & Info ℹ️\n4️⃣ Sticker Maker 🎨\n5️⃣ Quote Generator 💭\n\nPilih dengan mengetik angka (1-5)`,
          quoteMenu: `💭 *QUOTE GENERATOR*\n\nPilih jenis quote yang diinginkan:\n\n1️⃣ Quote Random 💫\n2️⃣ Pantun Random 🎭\n3️⃣ Kata Motivasi 🔥\n\nKetik angka (1-3) atau */menu* untuk kembali`,
        quoteSuccess: '✨ Berikut quote untuk Anda!',
        quoteError: '❌ Gagal mengambil quote. Silakan coba lagi.',
        tiktokMenu: `⚡ *TIKTOK DOWNLOAD*\n\nLangsung kirim link TikTok yang ingin didownload!\n\n*Contoh:*\nhttps://www.tiktok.com/@username/video/123456789\n\nKetik */menu* untuk kembali ke menu utama`,
        
        quickTiktokMenu: `⚡ *TIKTOK DOWNLOAD*\n\nLangsung kirim link TikTok yang ingin didownload!\n\n*Contoh:*\nhttps://www.tiktok.com/@username/video/123456789\n\nKetik */menu* untuk kembali ke menu utama`,
        
        aiMenu: `🤖 *AI CHAT MODE*\n\nSekarang kamu bisa chat dengan AI!\n\n*Cara pakai:*\n• Langsung ketik pesan apa saja\n• Ketik */menu* atau *exit* untuk kembali ke menu utama\n• Ketik */model* untuk ganti model AI\n• Ketik */help* untuk bantuan lengkap\n\n*Model aktif:* Default AI\n\nSilakan mulai percakapan! 💬`,
        
        stickerMenu: `🎨 *STICKER MAKER MODE*\n\nKirim gambar atau video untuk dijadikan sticker!\n\n*Format yang didukung:*\n📸 Gambar: JPG, PNG, WEBP, GIF\n🎬 Video: MP4, WEBM (max 10 detik)\n\n*Cara pakai:*\n• Kirim gambar/video langsung\n• Atau reply gambar/video dengan caption\n• Ketik */menu* untuk kembali ke menu utama\n\n*Tips:*\n• Gambar persegi akan menghasilkan sticker terbaik\n• Video akan dikonversi menjadi sticker animasi\n• Ukuran file maksimal 5MB`,
        
        selectCategory: '📂 Silahkan pilih kebutuhan dengan mengetik nomor menu',
        
        invalidCategory: '❌ Pilihan tidak valid. Pilih angka 1-5',
        
        categorySelected: (category) => `✅ Sukses dipilih: *${category}*\n\nSekarang kirim link TikTok yang ingin didownload`,
        
        invalidLink: '❌ Link TikTok tidak valid. Pastikan link dimulai dengan https://tiktok.com atau https://www.tiktok.com atau https://vm.tiktok.com',
        
        processing: '⏳ Sedang memproses video...',
        
        processingSticker: '🎨 Sedang membuat sticker...',
        
        aiThinking: '🤖 waiting sedelo...',
        
        success: '✅ Video berhasil didownload!',
        
        stickerSuccess: '✅ Sticker berhasil dibuat!',
        
        stickerError: '❌ Gagal membuat sticker. Pastikan file adalah gambar/video yang valid',
        
        invalidStickerFormat: '❌ Format file tidak didukung untuk sticker.\n\n*Format yang didukung:*\n📸 JPG, PNG, WEBP, GIF\n🎬 MP4, WEBM (max 10 detik)',
        
        fileTooLarge: '❌ File terlalu besar! Maksimal 5MB',
        
        videoTooLong: '❌ Video terlalu panjang! Maksimal 10 detik untuk sticker',
        
        noMediaReceived: '❌ Tidak ada gambar/video yang diterima. Kirim gambar atau video untuk dijadikan sticker.',
        
        error: '❌ Terjadi kesalahan saat memproses permintaan\n\n*Silakan coba lagi siapatau beruntung:v*',
        
        aiError: '❌ *Waduh, ai sek mumet. tunggu sedelo:D*',
        
         help: `📖 *BANTUAN BOT*\n\n*Perintah Umum:*\n/menu - Menu utama\n/start - Mulai bot\n/help - Bantuan ini\n/info - Info bot\n/sticker - Mode sticker maker\n/quote - Quote generator\n\n*Download TikTok:*\n1. Pilih menu Download TikTok\n2. Langsung kirim link TikTok\n3. Video akan dikirim tanpa watermark\n\n*Chat AI:*\n1. Pilih menu Chat AI\n2. Mulai percakapan dengan AI\n3. Ketik /model untuk ganti model\n4. Ketik /menu atau exit untuk keluar\n\n*Sticker Maker:*\n1. Pilih menu Sticker Maker\n2. Kirim gambar/video\n3. Sticker akan dibuat otomatis\n4. Mendukung format JPG, PNG, GIF, MP4\n\n*Quote Generator:*\n1. Pilih menu Quote Generator\n2. Pilih jenis: Quote, Pantun, atau Motivasi\n3. Bot akan kirim quote random\n\n*Tips:*\n• Bot dapat mengingat konteks percakapan\n• Gunakan /menu untuk berpindah mode\n• Bot akan auto-cleanup file lama`,
        aiHelp: `🤖 *BANTUAN AI CHAT*\n\n*Perintah khusus:*\n/model - Ganti model AI\n/clear - Hapus history chat\n/stats - Lihat statistik\n/menu - Kembali ke menu utama\n/exit - Keluar dari mode AI\n\n*Cara keluar:*\n• Ketik */menu* atau */exit*\n• Ketik *exit*, *keluar*, *kembali*\n• Ketik *menu* untuk kembali ke menu utama\n\n*Tips:*\n• AI bisa mengingat percakapan sebelumnya\n• Maksimal 10 pesan per menit\n• History otomatis dibatasi 10 exchange\n• Ketik dengan natural, seperti ngobrol biasa!\n\n💡 *Untuk kembali ke menu utama, ketik: /menu*`,
        
        stickerHelp: `🎨 *BANTUAN STICKER MAKER*\n\n*Cara membuat sticker:*\n1. Masuk ke mode Sticker Maker\n2. Kirim gambar atau video\n3. Bot akan otomatis membuat sticker\n\n*Format yang didukung:*\n📸 Gambar: JPG, JPEG, PNG, WEBP, GIF\n🎬 Video: MP4, WEBM (max 10 detik)\n\n*Batasan:*\n• Ukuran file maksimal: 5MB\n• Durasi video maksimal: 10 detik\n• Gambar akan diubah ke ukuran 512x512\n\n*Tips untuk hasil terbaik:*\n• Gunakan gambar dengan rasio 1:1 (persegi)\n• Background transparan akan dipertahankan\n• Video pendek menghasilkan sticker animasi yang baik\n\n*Perintah:*\n/menu - Kembali ke menu utama\n/help - Bantuan lengkap`,
        
        info: `ℹ️ *INFO BOT*\n\n*Nama:* TikTok Downloader & AI Chat Bot\n*Versi:* 2.4.0\n*Fitur:*\n📹 Download TikTok tanpa watermark\n⚡ Quick Download (tanpa kategori)\n🤖 Chat dengan AI (Hugging Face)\n🎨 Sticker Maker dari gambar/video\n💭 Quote Generator (Quote, Pantun, Motivasi)\n🧹 Auto cleanup file\n🔄 Exit dari mode AI ke menu utama\n\n*Developer:* Igimonsan\n*Status:* 🟢 Online`
},
    
    // AI Chat modes
    aiModes: {
        DISABLED: 'disabled',
        ENABLED: 'enabled'
    },
    
    // User states
    userStates: {
        MAIN_MENU: 'main_menu',
        QUICK_TIKTOK: 'quick_tiktok',
        AI_CHAT: 'ai_chat',
        STICKER_MAKER: 'sticker_maker',
        QUOTE_GENERATOR: 'quote_generator'
    },
    //QUOTE
    quotes: {
    
    },
    // Regex untuk validasi link TikTok
    tiktokRegex: /https?:\/\/(?:www\.|vt\.)?tiktok\.com\/[\w\-\._~:\/?#\[\]@!\$&'\(\)\*\+,;=]*/
};

module.exports = config;