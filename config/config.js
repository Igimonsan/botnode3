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

    quotes: {
    random: [
        {
            text: "Hidup ini seperti sepeda, untuk menjaga keseimbangan kamu harus terus bergerak",
            author: "Albert Einstein"
        },
        {
            text: "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan",
            author: "Albert Schweitzer"
        },
        {
            text: "Jangan tunggu kesempatan, tapi ciptakanlah kesempatan itu",
            author: "George Bernard Shaw"
        },
        {
            text: "Yang terbaik dari masa depan adalah ia datang satu hari pada satu waktu",
            author: "Abraham Lincoln"
        },
        {
            text: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas",
            author: "Henry Ford"
        },
         {
        text: "Hidup ini seperti sepeda, untuk menjaga keseimbangan kamu harus terus bergerak",
        author: "Albert Einstein"
    },
    {
        text: "Kesuksesan adalah kemampuan untuk pergi dari satu kegagalan ke kegagalan lain tanpa kehilangan antusiasme",
        author: "Winston Churchill"
    },
    {
        text: "Orang yang kuat bukan mereka yang selalu menang, melainkan mereka yang tetap tegar ketika mereka jatuh",
        author: "Anonim"
    },
    {
        text: "Jadilah perubahan yang ingin kamu lihat di dunia",
        author: "Mahatma Gandhi"
    },
    {
        text: "Ketika satu pintu tertutup, pintu lain terbuka",
        author: "Alexander Graham Bell"
    },
    {
        text: "Keberanian bukanlah ketiadaan rasa takut, tetapi kemenangan atas rasa takut",
        author: "Nelson Mandela"
    },
    {
        text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia",
        author: "Nelson Mandela"
    },
    {
        text: "Berpikirlah seperti raja. Raja tidak takut gagal. Kegagalan adalah batu loncatan menuju kebesaran",
        author: "Oprah Winfrey"
    },
    {
        text: "Waktu adalah hal yang paling adil. Semua orang mendapat jumlah waktu yang sama setiap hari",
        author: "Harvey Mackay"
    },
    {
        text: "Satu-satunya batasan untuk pencapaian kita di hari esok adalah keraguan kita hari ini",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Tidak ada rahasia untuk sukses. Itu adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan",
        author: "Colin Powell"
    },
    {
        text: "Jangan tunggu momen yang sempurna. Ambil momen itu dan buatlah sempurna",
        author: "Zoey Sayward"
    },
    {
        text: "Hidup bukan tentang menunggu badai berlalu, tapi belajar menari di tengah hujan",
        author: "Vivian Greene"
    },
    {
        text: "Kebahagiaan tidak tergantung pada apa yang kamu miliki, tetapi pada apa yang kamu pikirkan",
        author: "Dale Carnegie"
    },
    {
        text: "Jangan biarkan opini orang lain menenggelamkan suara hatimu",
        author: "Steve Jobs"
    },
    {
        text: "Kesempatan tidak terjadi begitu saja. Kamu harus menciptakannya",
        author: "Chris Grosser"
    },
    {
        text: "Berusahalah bukan untuk menjadi sukses, tetapi untuk menjadi bernilai",
        author: "Albert Einstein"
    },
    {
        text: "Keberhasilan adalah kombinasi dari mimpi besar dan kerja keras yang konsisten",
        author: "Elon Musk"
    },
    {
        text: "Langkah pertama untuk mendapatkan apa yang kamu inginkan adalah memiliki keberanian untuk meninggalkan apa yang tidak kamu butuhkan",
        author: "Anonim"
    },
    {
        text: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas",
        author: "Henry Ford"
    },
    {
        text: "Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari kemarin",
        author: "Anonim"
    },
    {
        text: "Impian tidak akan bekerja kecuali kamu bekerja",
        author: "John C. Maxwell"
    },
    {
        text: "Sukses dimulai dari keputusan untuk mencoba",
        author: "John F. Kennedy"
    },
    {
        text: "Kamu lebih berani dari yang kamu percaya, lebih kuat dari yang kamu lihat, dan lebih pintar dari yang kamu pikirkan",
        author: "A.A. Milne"
    },
    {
        text: "Cara terbaik untuk meramalkan masa depan adalah dengan menciptakannya",
        author: "Peter Drucker"
    },
    {
        text: "Jangan bandingkan dirimu dengan orang lain. Bandingkan dirimu dengan dirimu yang kemarin",
        author: "Jordan Peterson"
    },
    {
        text: "Jadilah versi terbaik dari dirimu, bukan versi palsu dari orang lain",
        author: "Judy Garland"
    },
    {
        text: "Kita tidak bisa mengarahkan angin, tapi kita bisa menyesuaikan layar kita",
        author: "Dolly Parton"
    },
    {
        text: "Kesabaran itu pahit, tetapi buahnya manis",
        author: "Jean-Jacques Rousseau"
    },
    {
        text: "Jangan pernah menyerah karena hal besar butuh waktu",
        author: "Anonim"
    },
    {
        text: "Kesederhanaan adalah kunci dari kebahagiaan sejati",
        author: "Dalai Lama"
    },
    {
        text: "Ubah dunia dengan menjadi dirimu sendiri",
        author: "Amy Poehler"
    },
    {
        text: "Lakukan yang terbaik sampai kamu tahu lebih baik. Ketika kamu tahu lebih baik, lakukan yang lebih baik",
        author: "Maya Angelou"
    },
    {
        text: "Keinginan untuk menang tidak berarti apa-apa tanpa keinginan untuk berlatih",
        author: "Paul Bryant"
    },
    {
        text: "Hal yang membuat kita berbeda adalah hal yang membuat kita luar biasa",
        author: "Emma Stone"
    },
    {
        text: "Bukan keadaan yang menentukan siapa kamu, tetapi bagaimana kamu meresponnya",
        author: "Tony Robbins"
    },
    {
        text: "Setiap pencapaian besar dimulai dengan keputusan untuk mencoba",
        author: "Gail Devers"
    },
    {
        text: "Jangan biarkan rasa takut gagal lebih besar dari keinginanmu untuk sukses",
        author: "Robert Kiyosaki"
    },
    {
        text: "Jika kamu ingin pergi jauh, pergi bersama-sama",
        author: "Pepatah Afrika"
    },
    {
        text: "Cinta dan kasih sayang adalah kebutuhan, bukan kemewahan",
        author: "Dalai Lama"
    },
    {
        text: "Jangan menunggu motivasi datang. Disiplin yang akan membawamu ke sana",
        author: "Jocko Willink"
    },
    {
        text: "Mereka yang cukup gila untuk berpikir mereka bisa mengubah dunia, adalah mereka yang melakukannya",
        author: "Steve Jobs"
    },
    {
        text: "Kreativitas adalah kecerdasan yang bersenang-senang",
        author: "Albert Einstein"
    },
    {
        text: "Segala sesuatu yang kamu inginkan ada di sisi lain dari rasa takut",
        author: "George Addair"
    },
    {
        text: "Kamu tidak bisa menyeberangi lautan hanya dengan berdiri dan menatap air",
        author: "Rabindranath Tagore"
    },
    {
        text: "Jadilah cahaya bahkan di saat dunia sedang gelap",
        author: "Anonim"
    },
    {
        text: "Hanya karena jalannya tidak mudah bukan berarti itu bukan jalannya",
        author: "Anonim"
    },
    {
        text: "Kunci kebahagiaan adalah bersyukur",
        author: "Anonim"
    },
    {
        text: "Belajar dari kemarin, hidup untuk hari ini, berharap untuk esok",
        author: "Albert Einstein"
    }
    ],
    
    pantun:[
    "Pergi ke pasar membeli duku\nDuku manis dibawa pulang\nJangan terlalu banyak mengeluh\nHidup ini harus diperjuangkan",
    "Bunga melati harum semerbak\nDipetik pagi hari\nBekerja keras jangan setengah hati\nAgar masa depan tak kelam gulita",
    "Naik becak ke pasar baru\nPulangnya bawa rambutan\nBelajar rajin dari sekarang\nSupaya sukses masa depan",
    "Burung merpati terbang tinggi\nHinggap sebentar di dahan cemara\nJangan malu untuk mencoba lagi\nGagal bukan akhir segalanya",
    "Pagi hari minum kopi\nDitemani roti isi coklat\nKalau mau jadi pribadi hebat\nBangun pagi jangan terlambat",
    "Ke warung beli semangka\nSemangka pecah dibagi dua\nCinta sejati tak butuh harta\nYang penting saling setia",
    "Jalan-jalan ke kota Medan\nNaik bus berderet-deret\nKalau hidup penuh tekanan\nNgopi dulu biar semangat",
    "Ikan sepat ikan gabus\nLebih cepat lebih bagus\nKalau cinta jangan modus\nNanti malah jadi virus",
    "Pagi-pagi lihat si kucing\nTidur pulas di atas tikar\nJangan suka cuma mengeluh\nAyo bangkit, jangan gentar",
    "Burung hantu matanya besar\nHidupnya aktif saat malam\nKalau kamu ingin pintar\nBelajarlah jangan malas dalam",
    "Jalan-jalan ke Pulau Seribu\nLihat ombak berkejar-kejaran\nKalau salah ayo mengaku\nJangan tunggu dimarahi atasan",
    "Makan siang dengan rendang\nDitemani sambal hijau pedas\nKalau hidupmu kurang tenang\nMungkin butuh piknik bebas",
    "Naik sepeda ke hutan pinus\nBerhenti sebentar minum teh hangat\nJangan selalu merasa minus\nHidup ini tetap nikmat",
    "Pakai sepatu warna merah\nBerjalan ke arah taman bunga\nKalau kamu sedang resah\nSholat dulu, tenangkan jiwa",
    "Kucing oren naik motor\nBawa tas penuh makanan\nKalau gagal satu sektor\nBangun lagi di kesempatan lanjutan",
    "Main layangan di sore hari\nTersangkut di atas tiang\nKalau cinta ditolak lagi\nMungkin Tuhan punya rencana terang",
    "Buah apel rasanya manis\nDimakan siang saat santai\nKalau hari ini kamu menangis\nBesok tersenyumlah lebih damai",
    "Anak ayam turun lima\nSatunya hilang lari ke ladang\nKalau niat sudah di dada\nJangan ditunda, ayo bertandang",
    "Sore hari makan donat\nDuduk santai sambil online\nCintailah diri dengan erat\nJangan bandingkan dengan timeline",
    "Beli es teh di pinggir jalan\nMinumnya sambil tertawa ceria\nKalau hidupmu banyak tekanan\nCobalah libatkan doa dan usaha",
    "Pohon bambu tinggi menjulang\nTumbuh kokoh di tanah subur\nJangan diam terus mengulang\nCoba hal baru, hidup lebih makmur",
    "Langit biru dihiasi awan\nAngin bertiup membawa rindu\nKalau teman sedang kesusahan\nJangan diam, ulurkanlah bantu",
    "Menanam tomat di kebun nenek\nDisiram tiap pagi dan petang\nKalau kamu sering ditekan bos jelek\nIngat, rezeki bukan dari dia seorang",
    "Naik perahu ke pulau seberang\nAngin berhembus sangat kencang\nKalau kamu masih kurang senang\nMungkin waktunya buka peluang",
    "Burung nuri berwarna cerah\nTerbang ke ranting paling tinggi\nKalau ingin hati jadi indah\nJauhkan dengki dan iri hati",
    "Cuci piring setelah makan\nDibantu adik dengan semangat\nKalau hidupmu penuh tekanan\nJangan lupa bersyukur setiap saat",
    "Main gitar sambil bernyanyi\nSuara merdu menghibur hati\nKalau teman sedang bersedih\nDengarkan dulu, jangan ikut menyakiti",
    "Ke pasar beli pepaya\nPulangnya bawa pisang raja\nKalau cinta hanya gaya-gaya\nNanti hatinya bisa kecewa",
    "Anak kucing lari-lari\nMengejar bayangan sendiri\nKalau mimpi ingin jadi menteri\nMulai dulu dari disiplin diri",
    "Beli baju di toko barat\nWarnanya merah, pas untuk pesta\nKalau ingin hati lebih sehat\nMaafkan masa lalu yang luka",
    "Naik gunung bawa bekal\nJangan lupa kamera digital\nKalau bosan hidup formal\nBuka usaha digital lokal",
    "Masak nasi goreng spesial\nDiberi telur dan sosis lezat\nJangan takut jadi gagal\nTiap proses itu sangat hebat",
    "Burung pipit di dahan rambutan\nBernyanyi riang menyambut pagi\nKalau hidup penuh tantangan\nTersenyumlah, itu jalan menuju tinggi",
    "Beli sandal di toko dua\nYang satu bolong, yang satu sobek\nKalau sering ditinggal dia\nYakinlah kamu pantas dapat yang baik",
    "Main bola di lapangan hijau\nHujan turun, semua berlari\nKalau banyak cobaan yang galau\nIngat, hujan bawa pelangi nanti",
    "Pergi ke taman bawa bekal\nMakan bareng teman sekelas\nKalau cinta hanya sekadar trial\nMundur pelan, jangan dilepas",
    "Malam minggu nonton konser\nNyanyi bareng lagu nostalgia\nKalau banyak tugas menumpuk besar\nJangan panik, satu-satu saja",
    "Naik delman keliling kota\nSambil foto pakai kamera tua\nKalau pacar mulai drama\nBlok aja, selamatkan jiwa",
    "Bunga mawar di taman depan\nDisiram tiap hari tanpa henti\nKalau hidup penuh tekanan\nLuapkan lewat karya dan seni",
    "Pergi mancing ke empang besar\nUmpannya cacing merah berdansa\nKalau hatimu mulai gusar\nMungkin waktunya istirahat kerja",
    "Main layangan di tanah lapang\nPutus talinya, jatuh ke sawah\nKalau mantan masih dikenang\nIngat, yang setia sedang di arah",
    "Naik motor ke arah kota\nMacet panjang bikin lelah\nKalau kamu ingin bahagia nyata\nTinggalkan iri dan serakah",
    "Minum kopi di pagi hari\nDitemani lagu slow santai\nKalau gagal jangan sakit hati\nItu tandanya kamu sedang dicintai Ilahi",
    "Ke sekolah bawa bekal\nIsinya nasi dan ayam bakar\nKalau cinta terlalu kekal\nJangan lupa logika diputar",
    "Main ayunan di taman belakang\nTertawa riang bersama teman\nKalau kamu sedang bimbang\nTulis mimpi, buat perencanaan",
    "Anak kecil bermain bola\nTertawa ceria tanpa beban\nKalau dewasa banyak drama\nSantai saja, itu bagian dari perjalanan",
    "Naik sepeda roda dua\nPakai helm jangan lupa\nKalau hatimu sedang luka\nIngat, semua akan baik pada waktunya",
    "Pergi ke pasar beli mentega\nUntuk bikin kue ulang tahun\nKalau kamu ingin bahagia\nIkhlaskan yang pergi, sambut yang baru datang"
],
    motivasi: [
        {
            text: "Kesuksesan adalah hasil dari persiapan yang tepat, kerja keras, dan belajar dari kegagalan",
            author: "Colin Powell"
        },
        {
            text: "Jangan takut untuk memulai dari nol, karena semua ahli pun pernah menjadi pemula",
            author: "Robin Sharma"
        },
        {
            text: "Keberanian bukan berarti tidak takut, tapi tetap melangkah meski dalam ketakutan",
            author: "Nelson Mandela"
        },
        {
            text: "Mimpi tanpa action hanyalah khayalan, action tanpa mimpi hanyalah rutinitas",
            author: "John C. Maxwell"
        },
        {
            text: "Kamu tidak perlu menjadi hebat untuk memulai, tapi kamu harus memulai untuk menjadi hebat",
            author: "Zig Ziglar"
        },
         {
        text: "Kesuksesan adalah hasil dari persiapan yang tepat, kerja keras, dan belajar dari kegagalan",
        author: "Colin Powell"
    },
    {
        text: "Jangan menunggu waktu yang tepat, karena waktu tidak pernah benar-benar tepat",
        author: "Napoleon Hill"
    },
    {
        text: "Impian tidak menjadi kenyataan melalui sihir. Dibutuhkan keringat, tekad, dan kerja keras",
        author: "Colin Powell"
    },
    {
        text: "Bekerja keras dalam diam, biarkan kesuksesanmu yang berbicara",
        author: "Frank Ocean"
    },
    {
        text: "Langkah kecil setiap hari akan membawa kita menuju hasil yang besar",
        author: "Anonim"
    },
    {
        text: "Jangan takut gagal, karena kegagalan adalah bagian dari proses menuju sukses",
        author: "Thomas A. Edison"
    },
    {
        text: "Kesuksesan bukan milik orang pintar, tapi milik mereka yang terus berusaha",
        author: "B.J. Habibie"
    },
    {
        text: "Setiap hari adalah kesempatan baru untuk tumbuh dan menjadi lebih baik",
        author: "Anonim"
    },
    {
        text: "Orang sukses adalah mereka yang tetap bergerak meski sedang takut",
        author: "Tony Robbins"
    },
    {
        text: "Jika kamu lelah, istirahatlah, bukan menyerah",
        author: "Anonim"
    },
    {
        text: "Jangan bandingkan dirimu dengan orang lain, bandingkan dengan dirimu yang kemarin",
        author: "Jordan Peterson"
    },
    {
        text: "Mulailah dengan apa yang kamu miliki, lakukan apa yang kamu bisa",
        author: "Arthur Ashe"
    },
    {
        text: "Kegigihan adalah kunci dari pencapaian besar",
        author: "Elon Musk"
    },
    {
        text: "Keberhasilan dimulai dari keberanian untuk mencoba",
        author: "Marie Curie"
    },
    {
        text: "Pemenang adalah pemimpi yang tidak pernah menyerah",
        author: "Nelson Mandela"
    },
    {
        text: "Rintangan adalah hal yang kamu lihat ketika kamu mengalihkan pandangan dari tujuanmu",
        author: "Henry Ford"
    },
    {
        text: "Kamu tidak perlu menjadi hebat untuk memulai, tapi kamu harus memulai untuk menjadi hebat",
        author: "Zig Ziglar"
    },
    {
        text: "Jika kamu ingin sesuatu yang belum pernah kamu miliki, kamu harus bersedia melakukan sesuatu yang belum pernah kamu lakukan",
        author: "Thomas Jefferson"
    },
    {
        text: "Sukses bukan akhir, gagal bukan kehancuran, yang penting adalah keberanian untuk terus melangkah",
        author: "Winston Churchill"
    },
    {
        text: "Percaya pada dirimu sendiri adalah langkah pertama menuju kesuksesan",
        author: "Anonim"
    }
    ],
    },
    // Regex untuk validasi link TikTok
    tiktokRegex: /https?:\/\/(?:www\.|vt\.)?tiktok\.com\/[\w\-\._~:\/?#\[\]@!\$&'\(\)\*\+,;=]*/
};

module.exports = config;