// frontend/src/pages/demo/KembangSriwijaya/sections/AmplopDigital.tsx
import { useState } from "react";

type Rekening = {
  id: number;
  bank: string;
  nomor: string;
  atasNama: string;
};

const daftarRekening: Rekening[] = [
  { id: 1, bank: "BCA", nomor: "1234567890", atasNama: "Aditya Pratama" },
  {
    id: 2,
    bank: "Mandiri",
    nomor: "0987654321",
    atasNama: "Kirana Ayu Lestari",
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
    <div className="min-h-screen bg-[#2b1b12] text-[#f5e9d6] flex flex-col items-center px-6 py-20">
      <p className="tracking-[0.3em] text-xs uppercase text-[#d9b98a] mb-3">
        Tanda Kasih
      </p>
      <h2 className="font-serif text-3xl mb-3">Amplop Digital</h2>
      <p className="text-sm text-[#c9a876] max-w-sm text-center mb-12">
        Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
        kasih, bisa melalui:
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        {daftarRekening.map((r) => (
          <div
            key={r.id}
            className="border border-[#5c4a3a] rounded-lg px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-serif text-lg">{r.bank}</p>
              <p className="text-sm text-[#d9b98a] tracking-wider">{r.nomor}</p>
              <p className="text-xs text-[#c9a876] mt-1">a.n. {r.atasNama}</p>
            </div>
            <button
              onClick={() => handleCopy(r.nomor, r.id)}
              className="text-xs border border-[#d9b98a] rounded-full px-4 py-2 hover:bg-[#d9b98a] hover:text-[#2b1b12] transition-colors whitespace-nowrap"
            >
              {tersalin === r.id ? "Tersalin!" : "Salin"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmplopDigital;
