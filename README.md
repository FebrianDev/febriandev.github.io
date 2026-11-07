# Dynamic Android Developer Portfolio & Admin Dashboard

Website portofolio modern untuk Android Developer dengan data dinamis, manajemen konten via Web Admin, dan penyimpanan berbasis cloud **Supabase** (PostgreSQL + Auth + Storage). 100% gratis dan siap di-deploy ke **GitHub Pages**.

---

## 🚀 Fitur Utama

- **Web Portofolio Publik (`index.html`)**:
  - Tampilan modern bertema gelap (*dark mode*) dengan animasi *smooth*.
  - Menampilkan Hero, About Me, Tech Stack, Projects, Experience, Honors & Certifications (Achievements), serta Kontak.
  - Data dinamis terhubung langsung ke Supabase dengan *graceful fallback* ke data lokal jika sedang offline.
- **Web Admin Dashboard (`admin.html`)**:
  - **Autentikasi Aman**: Login Email & Password berbasis Supabase Auth.
  - **Kelola Projects**: Tambah, edit, hapus proyek, serta upload screenshot/mockup langsung ke Supabase Storage.
  - **Kelola Experience**: Atur riwayat karier, perusahaan, periode, status aktif, dan pencapaian.
  - **Kelola Achievements**: Tambah sertifikasi, lisensi, penerbit, tahun, dan link kredensial.
  - **Kelola Profil & Kontak**: Ubah bio, status ketersediaan, tautan LinkedIn & GitHub.
  - **1-Click Sync**: Sinkronisasi data bawaan ke database dalam 1 kali klik.

---

## 🛠️ Menjalankan di Lokal

Untuk menjalankan portofolio dan web admin di komputer lokal:

```bash
# Jalankan server lokal bawaan Node.js
node server.mjs
```

Lalu buka di browser:
- **Web Portofolio**: [http://localhost:3000/](http://localhost:3000/)
- **Web Admin**: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 🌐 Deploy ke GitHub Pages (Gratis Selamanya)

1. **Commit & Push ke GitHub**:
   ```bash
   git add .
   git commit -m "feat: portfolio dinamis dengan web admin supabase"
   git push origin main
   ```

2. **Aktifkan GitHub Pages**:
   - Buka repositori kamu di GitHub.
   - Buka tab **Settings** > menu **Pages** di sidebar kiri.
   - Di bagian **Build and deployment > Branch**, pilih `main` dan folder `/(root)`.
   - Klik **Save**.

3. **Akses Web**:
   - Portofolio Publik: `https://<username>.github.io/<nama-repo>/`
   - Web Admin: `https://<username>.github.io/<nama-repo>/admin.html`

---

## 📁 Struktur File

```text
portfolio/
├── index.html            # Halaman portofolio publik
├── admin.html            # Halaman dashboard admin
├── supabase-config.js    # Konfigurasi Supabase (URL & Publishable Key)
├── supabase_schema.sql   # Skrip skema database & aturan keamanan (RLS)
├── server.mjs            # Server lokal ringan untuk pengujian di komputer
├── js/
│   └── admin.js          # Logika login, CRUD, dan upload storage
└── README.md             # Panduan proyek
```

