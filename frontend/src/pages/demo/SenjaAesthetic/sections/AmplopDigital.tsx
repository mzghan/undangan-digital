// frontend/src/pages/demo/SenjaAesthetic/sections/AmplopDigital.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Rekening = {
  id: number;
  bank: string;
  nomor: string;
  atasNama: string;
};

const daftarRekening: Rekening[] = [
  { id: 1, bank: "BCA", nomor: "2345678901", atasNama: "Bagas Nararya" },
  {
    id: 2,
    bank: "Bank Jago",
    nomor: "1122334455",
    atasNama: "Alika Putri Wijaya",
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
      className="min-h-screen bg-[#f5e6dc] text-[#3d2e28] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c17b5f] mb-3">
        Tanda Kasih
      </p>
      <h2 className="font-heading text-3xl mb-3">Amplop Digital</h2>
      <p className="text-sm text-[#8c7b6f] max-w-sm text-center mb-12">
        Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
        kasih, bisa melalui:
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        {daftarRekening.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-md shadow-[#c17b5f]/10 px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-heading text-lg">{r.bank}</p>
              <p className="text-sm text-[#c17b5f] tracking-wider">
                {r.nomor}
              </p>
              <p className="text-xs text-[#8c7b6f] mt-1">a.n. {r.atasNama}</p>
            </div>
            <button
              onClick={() => handleCopy(r.nomor, r.id)}
              className="text-xs bg-[#c17b5f] text-white rounded-full px-4 py-2 hover:bg-[#a05a45] transition-colors whitespace-nowrap"
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
