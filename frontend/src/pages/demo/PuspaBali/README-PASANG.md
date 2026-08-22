# Cara Pasang Tema PuspaBali

1. Extract folder `PuspaBali` ini ke: `frontend/src/pages/demo/PuspaBali`
2. Buka `frontend/src/App.tsx`, tambahkan import di bagian atas:

   import PuspaBaliDemo from './pages/demo/PuspaBali';

3. Tambahkan route baru di dalam <Routes>, sejajar dengan route demo lain (di LUAR <Route element={<Layout />}>):

   <Route path="/undangan-digital/demo/puspa-bali" element={<PuspaBaliDemo />} />

4. Jalankan `npm run dev`, lalu buka:
   http://localhost:5173/undangan-digital/demo/puspa-bali

Data pengantin & jadwal acara ada di `data.ts` — tinggal ganti sesuai kebutuhan.
Dependensi yang dipakai (sudah ada di package.json project ini): react, react-router-dom, framer-motion, tailwindcss.

## Musik Latar (baru)

Setiap tema sekarang otomatis memutar musik latar saat tamu membuka undangan (tombol "Buka Undangan"), lengkap dengan tombol mute/play mengambang di pojok kanan atas.

1. Siapkan file musik (mp3, disarankan durasi pendek/loop, ukuran kecil supaya cepat loading, dan pastikan kamu punya lisensi/hak pakainya).
2. Taruh file itu di `public/musik/` pada project utama, dengan nama sesuai yang tertulis di `data.ts` masing-masing tema (variabel `musik`), atau ganti langsung path-nya di `data.ts`.
3. Beberapa browser mobile tetap memblokir autoplay walau sudah ada interaksi tap — kalau itu terjadi, tamu tinggal tap tombol musik di pojok kanan atas untuk mulai memutar manual.
