// frontend/src/pages/demo/DarkLuxuryNoir/sections/AcaraLokasi.tsx
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
      className="min-h-screen bg-[#1a1a1a] text-[#f0ede6] flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#d4af6a] mb-10">
        Save The Date
      </p>

      {/* Countdown */}
      <div className="flex gap-3 md:gap-5 mb-16">
        {[
          { label: "Hari", value: countdown.hari },
          { label: "Jam", value: countdown.jam },
          { label: "Menit", value: countdown.menit },
          { label: "Detik", value: countdown.detik },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#1e1e1e] rounded-none border border-[#d4af6a]/20 shadow-md shadow-[#d4af6a]/10"
          >
            <span className="font-heading text-xl md:text-2xl text-[#d4af6a]">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] mt-1 uppercase tracking-wider text-[#b0a894]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Acara */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-lg">
        <div className="flex-1 bg-[#1e1e1e] rounded-none border border-[#d4af6a]/20 px-6 py-7 shadow-md shadow-[#d4af6a]/10">
          <h3 className="font-heading text-xl mb-2">Akad Nikah</h3>
          <p className="text-sm text-[#d4af6a] mb-1">{acara.akad.label}</p>
          <p className="text-sm mb-1">{acara.akad.waktu}</p>
          <p className="text-sm text-[#b0a894]">{acara.akad.lokasi}</p>
        </div>
        <div className="flex-1 bg-[#1e1e1e] rounded-none border border-[#d4af6a]/20 px-6 py-7 shadow-md shadow-[#d4af6a]/10">
          <h3 className="font-heading text-xl mb-2">Resepsi</h3>
          <p className="text-sm text-[#d4af6a] mb-1">{acara.resepsi.label}</p>
          <p className="text-sm mb-1">{acara.resepsi.waktu}</p>
          <p className="text-sm text-[#b0a894]">{acara.resepsi.lokasi}</p>
        </div>
      </div>

      <a
        href={acara.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#d4af6a] text-white rounded-none px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#d4af6a]/30 hover:bg-[#b8933f] transition-colors"
      >
        Lihat Lokasi
      </a>
    </motion.div>
  );
}

export default AcaraLokasi;
