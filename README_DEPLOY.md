# Panduan Deploy ke Vercel

## Persiapan

Project ini menggunakan JSON Server untuk backend API. Karena Vercel adalah platform untuk static frontend, Anda memiliki beberapa opsi:

### Opsi 1: Menggunakan MockAPI atau My JSON Server (Direkomendasikan untuk Demo)

1. **Buat akun di MockAPI.io**
   - Kunjungi https://mockapi.io/
   - Buat project baru dan endpoint `/data`
   - Upload data dari `dbML.json`

2. **Update URL API di `script.js`**
   ```javascript
   const url = "https://[your-mockapi-id].mockapi.io/data";
   ```

3. **Deploy ke Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login ke Vercel
   vercel login

   # Deploy
   vercel
   ```

### Opsi 2: Deploy Frontend dan Backend Terpisah

#### Deploy Backend (JSON Server) ke Render/Railway
1. Buat `package.json` untuk backend
2. Deploy JSON Server ke Render.com atau Railway.app
3. Dapatkan URL backend

#### Deploy Frontend ke Vercel
1. Update URL di `script.js` dengan URL backend
2. Deploy dengan perintah `vercel`

## Langkah Deploy Frontend ke Vercel

### Melalui CLI:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Project**
   ```bash
   vercel
   ```
   
4. **Ikuti prompt:**
   - Set up and deploy? → Yes
   - Which scope? → Pilih account Anda
   - Link to existing project? → No
   - What's your project's name? → assignment3-crud-fetch-api (atau nama lain)
   - In which directory is your code located? → ./
   - Want to override the settings? → No

5. **Deploy ke Production**
   ```bash
   vercel --prod
   ```

### Melalui Web Dashboard:

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Buka Vercel Dashboard**
   - Kunjungi https://vercel.com/
   - Klik "Add New Project"
   - Import repository GitHub Anda
   - Klik "Deploy"

## Catatan Penting

⚠️ **Sebelum deploy, pastikan:**
- URL API di `script.js` sudah diganti dari `localhost:3000` ke URL backend online
- Semua file sudah di-commit ke Git
- CORS sudah dikonfigurasi di backend jika diperlukan

## Solusi Backend Online (Pilihan)

### 1. MockAPI.io (Gratis, mudah)
- URL: https://mockapi.io/
- Support CRUD operations
- Gratis untuk 2 projects

### 2. My JSON Server (Gratis, via GitHub)
- URL: https://my-json-server.typicode.com/
- Baca data dari repo GitHub
- **Catatan:** Hanya READ-ONLY

### 3. JSON Server di Render.com (Gratis)
- Buat repository baru dengan JSON Server
- Deploy ke Render.com
- Free tier tersedia

### 4. Supabase (Gratis, database real)
- URL: https://supabase.com/
- PostgreSQL database gratis
- Perlu modifikasi kode untuk integrasi

## Troubleshooting

**Problem:** API tidak bisa diakses
- **Solusi:** Pastikan URL API sudah diganti dan backend online

**Problem:** CORS Error
- **Solusi:** Tambahkan CORS headers di backend

**Problem:** Deploy gagal
- **Solusi:** Periksa log error di Vercel dashboard

