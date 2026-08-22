// frontend/src/pages/demo/Netflix/sections/AcaraLokasi.tsx
import { useEffect, useState } from "react";
import { acara } from "../data";

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
    <div
      id="acara"
      className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-10">
        Releasing In
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
            className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#181818] border border-[#2a2a2a] rounded-md"
          >
            <span className="font-black text-xl md:text-2xl text-white">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] mt-1 uppercase tracking-wider text-[#a3a3a3]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Acara */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-lg">
        <div className="flex-1 bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-7 text-left">
          <p className="text-[10px] uppercase tracking-widest text-[#E50914] font-bold mb-2">
            Episode 1
          </p>
          <h3 className="font-black text-xl mb-2">Akad Nikah</h3>
          <p className="text-sm text-[#d2d2d2] mb-1">{acara.akad.label}</p>
          <p className="text-sm mb-1">{acara.akad.waktu}</p>
          <p className="text-sm text-[#a3a3a3]">{acara.akad.lokasi}</p>
        </div>
        <div className="flex-1 bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-7 text-left">
          <p className="text-[10px] uppercase tracking-widest text-[#E50914] font-bold mb-2">
            Episode 2
          </p>
          <h3 className="font-black text-xl mb-2">Resepsi</h3>
          <p className="text-sm text-[#d2d2d2] mb-1">{acara.resepsi.label}</p>
          <p className="text-sm mb-1">{acara.resepsi.waktu}</p>
          <p className="text-sm text-[#a3a3a3]">{acara.resepsi.lokasi}</p>
        </div>
      </div>

      <a
        href={acara.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E50914] text-white rounded px-8 py-3.5 text-sm font-bold tracking-wide shadow-lg shadow-[#E50914]/30 hover:bg-[#f6121d] transition-colors"
      >
        Lihat Lokasi
      </a>
    </div>
  );
}

export default AcaraLokasi;
