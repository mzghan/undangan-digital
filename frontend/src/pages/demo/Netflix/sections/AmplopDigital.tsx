// frontend/src/pages/demo/Netflix/sections/AmplopDigital.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Rekening = {
  id: number;
  bank: string;
  nomor: string;
  atasNama: string;
};

const daftarRekening: Rekening[] = [
  { id: 1, bank: "BCA", nomor: "3456789012", atasNama: "Bima Satria Wardhana" },
  {
    id: 2,
    bank: "Bank Jago",
    nomor: "5566778899",
    atasNama: "Sasha Aulia Rahman",
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
      className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-3">
        Support the Show
      </p>
      <h2 className="font-black text-3xl mb-3">Amplop Digital</h2>
      <p className="text-sm text-[#a3a3a3] max-w-sm text-center mb-12">
        Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
        kasih, bisa melalui:
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        {daftarRekening.map((r) => (
          <div
            key={r.id}
            className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-black text-lg">{r.bank}</p>
              <p className="text-sm text-[#E50914] tracking-wider font-medium">
                {r.nomor}
              </p>
              <p className="text-xs text-[#a3a3a3] mt-1">a.n. {r.atasNama}</p>
            </div>
            <button
              onClick={() => handleCopy(r.nomor, r.id)}
              className="text-xs bg-[#E50914] text-white rounded px-4 py-2 font-bold hover:bg-[#f6121d] transition-colors whitespace-nowrap"
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
