// frontend/src/pages/demo/KoranLama/sections/AcaraLokasi.tsx
import { useEffect, useState } from "react";
import { acara } from "../data";
import { motion } from "framer-motion";

function useCountdown(targetDate: string) {
  const [sisaWaktu, setSisaWaktu] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const hitung = () => {
      const sekarang = new Date().getTime();
      const selisih = target - sekarang;

      if (selisih <= 0) {
        setSisaWaktu({ hari: 0, jam: 0, menit: 0, detik: 0 });
        return;
      }

      setSisaWaktu({
        hari: Math.floor(selisih / (1000 * 60 * 60 * 24)),
        jam: Math.floor((selisih / (1000 * 60 * 60)) % 24),
        menit: Math.floor((selisih / (1000 * 60)) % 60),
        detik: Math.floor((selisih / 1000) % 60),
      });
    };

    hitung(); // panggil sekali di awal, biar nggak nunggu 1 detik buat tampil
    const interval = setInterval(hitung, 1000);

    return () => clearInterval(interval); // bersihkan interval saat komponen unmount
  }, [targetDate]);

  return sisaWaktu;
}

function AcaraLokasi() {
  const countdown = useCountdown(acara.akad.tanggal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="acara"
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-10">
        Rubrik Agenda — Hitung Mundur
      </p>

      {/* Countdown */}
      <div className="flex gap-4 md:gap-8 mb-16">
        {[
          { label: "Hari", value: countdown.hari },
          { label: "Jam", value: countdown.jam },
          { label: "Menit", value: countdown.menit },
          { label: "Detik", value: countdown.detik },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#2b2620] flex items-center justify-center font-black text-2xl md:text-3xl">
              {String(item.value).padStart(2, "0")}
            </div>
            <span className="text-xs mt-2 uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Acara */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 w-full max-w-lg">
        <div className="flex-1 border border-[#2b2620] px-6 py-6 text-left">
          <p className="text-[10px] uppercase tracking-widest mb-1 italic">
            Kolom Pertama
          </p>
          <h3 className="font-black text-xl mb-2 uppercase">Akad Nikah</h3>
          <p className="text-sm mb-1">{acara.akad.label}</p>
          <p className="text-sm mb-1">{acara.akad.waktu}</p>
          <p className="text-sm">{acara.akad.lokasi}</p>
        </div>
        <div className="flex-1 border border-[#2b2620] px-6 py-6 text-left">
          <p className="text-[10px] uppercase tracking-widest mb-1 italic">
            Kolom Kedua
          </p>
          <h3 className="font-black text-xl mb-2 uppercase">Resepsi</h3>
          <p className="text-sm mb-1">{acara.resepsi.label}</p>
          <p className="text-sm mb-1">{acara.resepsi.waktu}</p>
          <p className="text-sm">{acara.resepsi.lokasi}</p>
        </div>
      </div>

      <a
        href={acara.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 border-[#2b2620] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors"
      >
        Lihat Peta Lokasi
      </a>
    </motion.div>
  );
}

export default AcaraLokasi;
