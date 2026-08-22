// frontend/src/pages/demo/PuspaBali/sections/AcaraLokasi.tsx
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
      className="min-h-screen bg-[#f7ecd6] text-[#3a2a1a] flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c9a24b] mb-10">
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
            className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-none border border-[#c9a24b]/40 shadow-md shadow-[#c9a24b]/10"
          >
            <span className="font-heading text-xl md:text-2xl text-[#c9a24b]">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] mt-1 uppercase tracking-wider text-[#8a7f6b]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Acara */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-lg">
        <div className="flex-1 bg-white rounded-none border border-[#c9a24b]/40 px-6 py-7 shadow-md shadow-[#c9a24b]/10">
          <h3 className="font-heading text-xl mb-2">Upacara Pawiwahan</h3>
          <p className="text-sm text-[#c9a24b] mb-1">{acara.akad.label}</p>
          <p className="text-sm mb-1">{acara.akad.waktu}</p>
          <p className="text-sm text-[#8a7f6b]">{acara.akad.lokasi}</p>
        </div>
        <div className="flex-1 bg-white rounded-none border border-[#c9a24b]/40 px-6 py-7 shadow-md shadow-[#c9a24b]/10">
          <h3 className="font-heading text-xl mb-2">Resepsi</h3>
          <p className="text-sm text-[#c9a24b] mb-1">{acara.resepsi.label}</p>
          <p className="text-sm mb-1">{acara.resepsi.waktu}</p>
          <p className="text-sm text-[#8a7f6b]">{acara.resepsi.lokasi}</p>
        </div>
      </div>

      <a
        href={acara.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#c9a24b] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#c9a24b]/30 hover:bg-[#a17c2f] transition-colors"
      >
        Lihat Lokasi
      </a>
    </div>
  );
}

export default AcaraLokasi;
