// frontend/src/pages/demo/KoranLama/sections/AmplopDigital.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Rekening = {
  id: number;
  bank: string;
  nomor: string;
  atasNama: string;
};

const daftarRekening: Rekening[] = [
  { id: 1, bank: "BCA", nomor: "4567890123", atasNama: "Raden Aryo Kusuma" },
  {
    id: 2,
    bank: "Mandiri",
    nomor: "6677889900",
    atasNama: "Anindita Prameswari",
  },
];

function AmplopDigital() {
  const [tersalin, setTersalin] = useState<number | null>(null);

  const handleCopy = async (nomor: string, id: number) => {
    try {
      await navigator.clipboard.writeText(nomor);
      setTersalin(id);
      setTimeout(() => setTersalin(null), 2000);
    } catch {
      // clipboard API bisa gagal di beberapa browser/kondisi — gagal senyap saja
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="amplop"
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-3">
        Rubrik Iklan Baris
      </p>
      <h2 className="font-black text-3xl mb-3 uppercase">Amplop Digital</h2>
      <p className="text-sm max-w-sm text-center mb-12 italic">
        Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
        kasih, bisa melalui:
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        {daftarRekening.map((r) => (
          <div
            key={r.id}
            className="border border-[#2b2620] px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-black text-lg uppercase">{r.bank}</p>
              <p className="text-sm tracking-wider">{r.nomor}</p>
              <p className="text-xs italic mt-1">a.n. {r.atasNama}</p>
            </div>
            <button
              onClick={() => handleCopy(r.nomor, r.id)}
              className="text-xs border border-[#2b2620] px-4 py-2 uppercase tracking-wide hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors whitespace-nowrap"
            >
              {tersalin === r.id ? "Tersalin!" : "Salin"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default AmplopDigital;
