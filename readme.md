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

### Generate random quote 
- Generate quotes
- Generate pantun
- Generate kata kata motivasi
  
## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd bot-by-igimonsan
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

!!!! SEBELUM MENJALANKAN BOT. HARAP LAKUKAN LANGKAH INI
### HAPUS FILE DI DALAM FOLDER SESSION AGAR SESI LOGIN DIPERBARUI. SETELAH ITU BISA DILANJUTKAN KE STEP SELANJUTNYA

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

## Update sessions
- Update Sessions harus dilakukan secara berkala, terutama jika BOT offline. karena ada kalanya Sessions login BOT sudah expired
  Step - by step
  1. Remove folder Sessions lama ```bash
$git rm -r sessions```
  2. Jalankan npm start dengan lokal (Cmd) lalu scan
  3. Upload folder sessions ```bash
  $git add sessions```
  5. Tambahkan commit ```bash $git commit -m "Komentar"```
  6. Push ```bash $git push -up Origin main```
Tunggu sampai folder sessions benar benar terbaca oleh vps/tempat hosting kamu. Jika sudah BOT akan otomatis online kembali
! GUNAKAN DENGAN BIJAK



**Made with Igimonsan**
