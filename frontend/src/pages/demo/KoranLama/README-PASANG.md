# Cara Pasang Tema Koran Lama

1. Extract folder `KoranLama` ini ke: `frontend/src/pages/demo/KoranLama`
2. Buka `frontend/src/App.tsx`, tambahkan import di bagian atas:

   import KoranLamaDemo from './pages/demo/KoranLama';

3. Tambahkan route baru di dalam <Routes>, sejajar dengan route demo lain (di LUAR <Route element={<Layout />}>):

   <Route path="/undangan-digital/demo/koran-lama" element={<KoranLamaDemo />} />

4. Jalankan `npm run dev`, lalu buka:
   http://localhost:5173/undangan-digital/demo/koran-lama

Data pengantin & jadwal acara ada di `data.ts` — tinggal ganti sesuai kebutuhan.
Dependensi yang dipakai (sudah ada di package.json project ini): react, react-router-dom, framer-motion, tailwindcss.
