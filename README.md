# Hero Mobile Legends - CRUD Application

Aplikasi CRUD (Create, Read, Update, Delete) untuk manajemen data Hero Mobile Legends menggunakan HTML, CSS, JavaScript, dan JSON Server.

## 📋 Features

- ✅ Tambah Hero Baru
- ✅ Lihat Daftar Hero
- ✅ Edit Data Hero
- ✅ Hapus Hero
- ✅ View Detail Hero dengan Modal
- ✅ Responsive Design dengan Bootstrap 5

## 🚀 Cara Menjalankan Project (Local Development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan JSON Server (Backend)

Buka terminal pertama dan jalankan:

```bash
npm start
```

Atau:

```bash
npx json-server --watch dbML.json --port 3000
```

JSON Server akan berjalan di: `http://localhost:3000`

**Output yang benar:**
```
\{^_^}/ hi!

Loading dbML.json
Done

Resources
http://localhost:3000/data

Home
http://localhost:3000
```

### 3. Buka Website (Frontend)

**Opsi A: Langsung buka file**
- Double click `index.html` di File Explorer

**Opsi B: Gunakan Live Server (Recommended)**
- Install extension "Live Server" di VS Code
- Klik kanan pada `index.html`
- Pilih "Open with Live Server"
- Website akan terbuka di `http://127.0.0.1:5500`

## 📁 Struktur File

```
assignment3-CRUD-fetch-API/
├── index.html          # Halaman utama
├── script.js           # Logic JavaScript (CRUD operations)
├── style.css           # Custom styling
├── dbML.json           # Database JSON (7 heroes)
├── package.json        # Dependencies & scripts
├── README.md           # Dokumentasi
├── README_DEPLOY.md    # Panduan deploy ke Vercel
└── vercel.json         # Konfigurasi Vercel
```

## 🎮 Cara Menggunakan

1. **Tambah Hero Baru:**
   - Isi form "Nama Hero", "Link Gambar Hero", "Role Hero", "Type Hero"
   - Klik tombol "Submit"
   - Hero baru akan muncul di list

2. **Lihat Detail Hero:**
   - Klik icon mata (👁️) biru di card hero
   - Modal akan muncul dengan detail lengkap

3. **Edit Hero:**
   - Klik icon pensil (✏️) kuning di card hero
   - Ubah data di modal yang muncul
   - Klik "Update"

4. **Hapus Hero:**
   - Klik icon tong sampah (🗑️) merah di card hero
   - Konfirmasi penghapusan
   - Hero akan terhapus dari list

## 🐛 Troubleshooting

### ❌ Problem: List hero tidak muncul, hanya form saja

**Penyebab:** JSON Server belum running

**Solusi:**
```bash
# Jalankan di terminal
npm start

# Atau
npx json-server --watch dbML.json --port 3000
```

Pastikan muncul output:
```
Resources
http://localhost:3000/data
```

### ❌ Problem: Error "Failed to fetch" di console

**Penyebab:** URL API salah atau JSON Server mati

**Solusi:**
1. Cek JSON Server masih running
2. Buka `http://localhost:3000/data` di browser
3. Pastikan ada data JSON muncul
4. Restart JSON Server jika perlu

### ❌ Problem: npm command not found

**Penyebab:** Node.js belum terinstall

**Solusi:**
1. Download Node.js dari https://nodejs.org/
2. Install Node.js (LTS version)
3. Restart terminal
4. Cek instalasi: `node --version` dan `npm --version`

### ❌ Problem: Port 3000 sudah digunakan

**Solusi:** Ganti port di `script.js` dan command:
```bash
npx json-server --watch dbML.json --port 3001
```

Lalu update di `script.js` baris 5:
```javascript
const url = "http://localhost:3001/data";
```

## 📦 Data Heroes (Default)

Database sudah berisi 7 heroes:
1. Rafaela - Support/Magic
2. Lesley - Marksman/Physical
3. Grock - Tank/Physical
4. Lancelot - Assassin/Physical
5. Nana - Mage/Magic
6. Alucard - Fighter/Physical
7. Clint - Fighter/Physical

## 🌐 Deploy ke Vercel

Lihat panduan lengkap di file `README_DEPLOY.md`

**Quick steps:**
1. Ganti URL API di `script.js` ke API online (MockAPI/Render)
2. Push ke GitHub
3. Connect repository ke Vercel
4. Deploy!

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **UI Framework:** Bootstrap 5.3.2
- **Icons:** Font Awesome
- **Backend:** JSON Server
- **Deployment:** Vercel (Frontend), MockAPI (Backend alternative)

## 📝 API Endpoints

```
GET    /data      - Get all heroes
GET    /data/:id  - Get hero by ID
POST   /data      - Create new hero
PUT    /data/:id  - Update hero
DELETE /data/:id  - Delete hero
```

## 👤 Author

Assignment 3 - CRUD Fetch API

## 📄 License

MIT License

