# 🚀 Cara Deploy ke Vercel - Panduan Lengkap Step by Step

## ❌ Kenapa CSS & Data Tidak Muncul di Vercel?

Saat deploy ke Vercel, Anda mengalami masalah:
1. **Data tidak muncul** → Karena `script.js` masih menggunakan `http://localhost:3000/data` yang hanya ada di komputer Anda
2. **CSS tidak ter-load** → Biasanya karena masalah path atau CORS

## ✅ Solusi: Setup Backend Online

Karena Vercel hanya untuk **static frontend**, Anda butuh backend API online.

---

## 📋 LANGKAH LENGKAP DEPLOY

### **STEP 1: Setup Backend di MockAPI.io**

#### 1.1 Buat Akun MockAPI

1. Buka https://mockapi.io/
2. Klik **"Sign Up"** (bisa pakai Google/GitHub)
3. Login dengan akun yang baru dibuat

#### 1.2 Buat Project Baru

1. Setelah login, klik **"+ New Project"**
2. Nama project: `hero-mobile-legends` (atau nama lain)
3. Klik **"Create"**

#### 1.3 Buat Resource/Endpoint

1. Klik **"+ New Resource"**
2. **Resource name:** `data` (⚠️ HARUS **data**, bukan heroes atau lainnya!)
3. Klik **"Create"**

#### 1.4 Setup Schema (Field/Kolom)

Klik tab **"Schema"**, lalu tambahkan fields berikut:

| Field Name | Type   |
|------------|--------|
| num        | string |
| name       | string |
| img        | string |
| role       | string |
| type       | string |

Klik **"Save Schema"**

#### 1.5 Tambah Data Heroes

Klik tombol **"+"** untuk tambah data manual, atau import dari file JSON:

**Data Sample Heroes:**

```json
{
  "num": "001",
  "name": "Rafaela",
  "img": "https://assets.skor.id/crop/0x0:0x0/x/photo/2021/04/20/1449773552.jpg",
  "role": "Support",
  "type": "Magic"
}
```

```json
{
  "num": "002",
  "name": "Lesley",
  "img": "https://cdn.oneesports.id/cdn-data/sites/2/2022/09/MLBB_Lesley-1024x576-1.png",
  "role": "Marksman",
  "type": "Physical"
}
```

```json
{
  "num": "003",
  "name": "Grock",
  "img": "https://blogger.googleusercontent.com/img/a/AVvXsEhvpaPfHetPaSGCzuCb5WIn4H-587LtfXg61bC73yL7ofXv1wceOkeo-VNTDOaNMfdF2b3G9W9aXxNicgmZWEcKgdc-2hwGJBND7CaqwILJ_2ObWDMUbgfQCAUtfcva8_gF1Exdq-e2Ep7u_HBacG29VU7lKfJP9PotIxdL2Bn-n4svsYQ9xZEedbtjbA=w1200-h630-p-k-no-nu",
  "role": "Tank",
  "type": "Physical"
}
```

Tambahkan minimal 3-7 heroes.

#### 1.6 Copy URL API

Setelah buat resource, MockAPI akan memberikan URL endpoint seperti:

```
https://6543abc123def.mockapi.io/data
```

**⚠️ COPY URL INI! Anda akan butuh di langkah berikutnya.**

Untuk test, buka URL tersebut di browser. Anda harus melihat data JSON heroes.

---

### **STEP 2: Update Script.js dengan URL MockAPI**

#### 2.1 Buka file `script.js`

Cari baris 9 yang berisi:

```javascript
const url = "http://localhost:3000/data";
```

#### 2.2 Ganti dengan URL MockAPI Anda

```javascript
const url = "https://6543abc123def.mockapi.io/data"; // ⬅️ GANTI dengan URL Anda!
```

**⚠️ PASTIKAN:**
- URL berakhiran `/data`
- Tidak ada spasi atau typo
- URL dimulai dengan `https://` bukan `http://`

#### 2.3 Save file `script.js`

---

### **STEP 3: Test di Local Dulu**

Sebelum deploy, pastikan website berfungsi dengan URL baru:

1. **Stop JSON Server** (jika masih running)
2. **Buka `index.html`** di browser
3. **Cek:**
   - ✅ List heroes muncul
   - ✅ Bisa tambah hero baru
   - ✅ Bisa edit & delete
   - ✅ Tidak ada error di Console (F12)

Jika ada error, periksa:
- URL MockAPI sudah benar?
- Data sudah ada di MockAPI?
- Internet connection aktif?

---

### **STEP 4: Push ke GitHub**

#### 4.1 Commit Changes

```bash
git add .
git commit -m "Update API URL untuk production deployment"
git push origin main
```

Jika belum punya repository GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Hero ML CRUD"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

Ganti `username` dan `repo-name` dengan akun & repository Anda.

---

### **STEP 5: Deploy ke Vercel**

#### Opsi A: Via Vercel Dashboard (Lebih Mudah)

1. **Buka Vercel Dashboard**
   - https://vercel.com/
   - Login dengan GitHub

2. **Import Repository**
   - Klik **"Add New Project"**
   - Klik **"Import"** pada repository `assignment3-CRUD-fetch-API`

3. **Configure Project**
   - **Project Name:** `hero-ml-crud` (atau nama lain)
   - **Framework Preset:** Other (atau None)
   - **Root Directory:** `./`
   - **Build Command:** (kosongkan)
   - **Output Directory:** (kosongkan)

4. **Deploy**
   - Klik **"Deploy"**
   - Tunggu 1-2 menit

5. **Dapatkan URL**
   - Setelah selesai, Vercel akan memberikan URL:
   ```
   https://hero-ml-crud.vercel.app
   ```

#### Opsi B: Via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

---

### **STEP 6: Test Website di Vercel**

Buka URL Vercel Anda (contoh: `https://hero-ml-crud.vercel.app`)

**Cek:**
- ✅ CSS ter-load (background, warna, card styling)
- ✅ List heroes muncul
- ✅ Form berfungsi
- ✅ CRUD operations bekerja
- ✅ Tidak ada error di Console (F12)

---

## 🔧 Troubleshooting

### ❌ Problem: Data tetap tidak muncul

**Solusi:**
1. Buka Console Browser (F12)
2. Cek error message
3. Pastikan URL MockAPI benar
4. Test URL MockAPI langsung di browser
5. Cek data sudah ada di MockAPI

### ❌ Problem: CSS tidak ter-load

**Solusi:**
1. Cek file `style.css` ada di repository
2. Cek path di `index.html`:
   ```html
   <link rel="stylesheet" href="style.css" />
   ```
   (Gunakan relative path, bukan absolute)
3. Clear cache browser (Ctrl+F5)
4. Re-deploy di Vercel

### ❌ Problem: CORS Error

**Solusi:**
MockAPI sudah support CORS by default. Jika masih ada error:
1. Pastikan URL MockAPI correct
2. Gunakan `https://` bukan `http://`
3. Cek MockAPI project settings

### ❌ Problem: Image tidak muncul

**Penyebab:** URL gambar di database broken atau CORS blocked

**Solusi:**
- Gunakan image hosting yang support CORS
- Upload gambar ke Imgur, Cloudinary, atau CDN lain
- Pastikan URL gambar valid & bisa diakses publik

---

## 📝 Checklist Deploy

Sebelum deploy, pastikan:

- [ ] MockAPI project sudah dibuat
- [ ] Data heroes sudah ditambahkan di MockAPI
- [ ] URL MockAPI sudah dicopy
- [ ] File `script.js` sudah diupdate dengan URL MockAPI
- [ ] Test di local berhasil (data muncul)
- [ ] Code sudah di-push ke GitHub
- [ ] Repository visibility: Public (untuk free Vercel)
- [ ] Deploy ke Vercel
- [ ] Test di URL Vercel (CSS & data muncul)

---

## 🎯 Alternative: Deploy Backend ke Render.com

Jika tidak ingin pakai MockAPI, Anda bisa deploy JSON Server ke Render:

1. **Buat file `server.js`:**
```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('dbML.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running on port ' + PORT);
});
```

2. **Update `package.json`:**
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}
```

3. **Deploy ke Render.com** (gratis)
4. **Dapatkan URL** seperti `https://hero-ml-api.onrender.com/data`
5. **Update `script.js`** dengan URL Render

---

## 📌 Tips

✅ **Development vs Production:**
- Development (local): `http://localhost:3000/data`
- Production (Vercel): `https://mockapi-url/data`

✅ **Custom Domain di Vercel:**
- Gratis domain `.vercel.app`
- Bisa custom domain sendiri (berbayar)

✅ **Update Data:**
- Update data langsung di MockAPI dashboard
- Changes otomatis sync ke website

✅ **Free Tier Limits:**
- MockAPI: 2 projects, 100 resources per project
- Vercel: Unlimited projects, 100GB bandwidth/bulan

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah, cek:
1. Console Browser (F12) untuk error messages
2. Network tab untuk failed requests
3. MockAPI dashboard untuk API status
4. Vercel logs untuk deployment errors

---

**Selamat! Website Anda sekarang online dan bisa diakses dari mana saja! 🎉**

