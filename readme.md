# 🤖 TikTok WhatsApp AI Bot

Bot WhatsApp multifungsi yang dapat mendownload video TikTok tanpa watermark dan chat dengan AI menggunakan Hugging Face.

## ✨ Fitur Utama

### 📹 TikTok Downloader
- Download video TikTok tanpa watermark
- Kategorisasi video otomatis
- Dukungan berbagai format link TikTok
- Auto cleanup file untuk menghemat storage

### 🤖 AI Chat
- Chat dengan AI menggunakan Hugging Face
- 3 model AI berbeda (Default, Creative, Smart)
- Mengingat konteks percakapan
- Rate limiting untuk mencegah spam
- Dukungan bahasa Indonesia

### 🛡️ Keamanan & Performa
- Rate limiting per user
- Auto cleanup session tidak aktif
- Error handling yang robust
- Monitoring dan statistik

### Stiker Maker
- Generate sticker via foto
- Generate sticker via video 

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd tiktok-whatsapp-ai-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
```bash
cp .env.example .env
```

Edit file `.env` dan tambahkan Hugging Face API token:
```env
HUGGINGFACE_API_KEY=your_huggingface_api_token_here
```

### 4. Dapatkan Hugging Face API Token
1. Buka [https://huggingface.co](https://huggingface.co)
2. Daftar/login ke akun Anda
3. Pergi ke Settings > Access Tokens
4. Buat token baru dengan permission "Read"
5. Copy token dan paste ke file `.env`

### 5. Jalankan Bot
```bash
npm start
```

### 6. Scan QR Code
- QR code akan muncul di terminal
- Buka WhatsApp di HP
- Pergi ke Settings > Linked Devices > Link a Device
- Scan QR code

## 📱 Cara Penggunaan

### Menu Utama
Ketik `/menu` atau `/start` untuk melihat menu utama:
- **1️⃣ Download TikTok** - Download video TikTok
- **2️⃣ Chat AI** - Chat dengan AI
- **3️⃣ Help & Info** - Bantuan dan informasi
- **4⃣ Sticker maker** - Membuat stiker
- **5⃣ Quote generator** - Mengirimkan quote random

### 📹 Download TikTok
1. Pilih menu "Download TikTok"
2. Pilih kategori video (1-7)
3. Kirim link Tik-tok
4. Video akan dikirim tanpa watermark

### 🤖 Chat AI
1. Pilih menu "Chat AI" atau ketik `/ai`
2. Mulai percakapan dengan AI
3. AI akan mengingat konteks percakapan
4. Ketik `/model` untuk ganti model AI

### Perintah Khusus AI
- `/model` - Ganti model AI
- `/clear` - Hapus history percakapan
- `/stats` - Lihat statistik AI
- `/help` - Bantuan mode AI

### Sticker maker
- 🎨 *STICKER MAKER MODE*

Kirim gambar atau video untuk dijadikan sticker!

*Format yang didukung:*
📸 Gambar: JPG, PNG, WEBP, GIF
🎬 Video: MP4, WEBM (max 10 detik)

*Cara pakai:*
• Kirim gambar/video langsung
• Atau reply gambar/video dengan caption
• Ketik */menu* untuk kembali ke menu utama

*Tips:*
• Gambar persegi akan menghasilkan sticker terbaik
• Video akan dikonversi menjadi sticker animasi
• Ukuran file maksimal 5MB

### Quote generator 
- 💭 *QUOTE GENERATOR*

Pilih jenis quote yang diinginkan:

1️⃣ Quote Random 💫
2️⃣ Pantun Random 🎭
3️⃣ Kata Motivasi 🔥

Ketik angka (1-3) atau */menu* untuk kembali

## 🔧 Konfigurasi

### Model AI yang Tersedia
- **Default**: Model standar untuk percakapan umum
- **Creative**: Model kreatif untuk cerita dan ide
- **Smart**: Model pintar untuk pertanyaan kompleks

### Rate Limiting
- AI Chat: 10 pesan per menit per user
- TikTok Download: 5 download per menit per user

### Auto Cleanup
- File TikTok: Dihapus setelah 1 jam
- Session tidak aktif: Dibersihkan setelah 30 menit
- History AI: Maksimal 10 exchange per user

## 📊 Monitoring

### Statistik yang Tersedia
- Total pengguna bot
- Total percakapan AI
- Jumlah file TikTok yang didownload
- Session aktif
- Uptime bot

### Log & Debugging
```bash
# Development mode dengan auto-restart
npm run dev

# Test koneksi AI
npm test
```

## 🐛 Troubleshooting

### Error: API Key tidak valid
- Pastikan API key Hugging Face benar
- Cek apakah token masih aktif
- Pastikan permission token adalah "Read"

### Error: Model tidak respond
- Model mungkin sedang loading (tunggu 20 detik)
- Coba ganti ke model lain dengan `/model`
- Cek koneksi internet

### Error: WhatsApp terputus
- Bot akan otomatis reconnect
- Jika gagal terus, restart bot
- Hapus folder `sessions` dan scan ulang QR

### File TikTok tidak terkirim
- Cek apakah link TikTok valid
- Pastikan video tidak private
- Coba download ulang

## 📝 Contributing

1. Fork repository
2. Buat branch baru: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🙏 Credits

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [Hugging Face](https://huggingface.co) - AI Models
- [Node.js](https://nodejs.org) - Runtime
- [Axios](https://axios-http.com) - HTTP Client

## 💬 Support

Jika ada pertanyaan atau issue:
1. Buat issue di GitHub
2. Cek dokumentasi Hugging Face
3. Lihat troubleshooting guide di atas



---

**Made with ❤️ for Indonesian developers**

## Konfigurasi tambahan

# WhatsApp Bot - Update Quote Generator

## Fitur Baru: Quote Generator 💭

Bot sekarang dilengkapi dengan fitur Quote Generator yang dapat menghasilkan:
- 📝 Quote Random inspiratif
- 🎭 Pantun Random
- 🔥 Kata-kata Motivasi


## Cara Menggunakan

### Menu Utama
Bot sekarang memiliki 5 pilihan menu:
1. Download TikTok ⚡
2. Chat AI 🤖
3. Help & Info ℹ️
4. Sticker Maker 🎨
5. **Quote Generator 💭** (BARU)

### Command Baru
- `/quote` atau `quote` - Quick access ke quote generator
- `/q` atau `q` - Shortcut untuk quote generator

### Quote Generator
Setelah masuk ke mode Quote Generator, user dapat memilih:
1. **Quote Random** - Quote inspiratif dari tokoh terkenal
2. **Pantun Random** - Pantun tradisional Indonesia
3. **Kata Motivasi** - Kata-kata motivasi untuk semangat

## Menambah Konten Quote

Untuk menambah quote, pantun, atau motivasi, edit file `config/config.js` di bagian `quotes`:

### Menambah Quote Random
```javascrip
**File CONFIG.js**
quotes: {
    random: [
        {
            text: "Teks quote di sini",
            author: "Nama pengarang"
        },
        // Tambah quote baru di sini
    ]
}
```

### Menambah Pantun
```javascript
pantun: [
    "Baris 1 pantun\nBaris 2 pantun\nBaris 3 pantun\nBaris 4 pantun",
    // Tambah pantun baru di sini
]
```

### Menambah Motivasi
```javascript
motivasi: [
    {
        text: "Teks motivasi di sini",
        author: "Nama pengarang"
    },
    // Tambah motivasi baru di sini
]
```

## Testing

Setelah update, test fitur dengan:
1. Ketik `/menu` - pastikan muncul 5 pilihan
2. Pilih angka `5` - masuk ke Quote Generator
3. Pilih `1`, `2`, atau `3` - test masing-masing jenis quote
4. Ketik `/quote` - test direct command

## Version Info
- **Previous:** v2.3.0
- **Current:** v2.4.0
- **New Feature:** Quote Generator (Quote Random, Pantun, Kata Motivasi)
