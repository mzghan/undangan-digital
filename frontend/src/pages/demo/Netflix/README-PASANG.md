# Cara Pasang Tema Netflix

1. Extract folder `Netflix` ini ke: `frontend/src/pages/demo/Netflix`
2. Buka `frontend/src/App.tsx`, tambahkan import di bagian atas:

   import NetflixDemo from './pages/demo/Netflix';

3. Tambahkan route baru di dalam <Routes>, sejajar dengan route demo lain (di LUAR <Route element={<Layout />}>):

   <Route path="/undangan-digital/demo/netflix" element={<NetflixDemo />} />

4. Jalankan `npm run dev`, lalu buka:
   http://localhost:5173/undangan-digital/demo/netflix

Data pengantin & jadwal acara ada di `data.ts` — tinggal ganti sesuai kebutuhan.
Dependensi yang dipakai (sudah ada di package.json project ini): react, react-router-dom, framer-motion, tailwindcss.
