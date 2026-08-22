// frontend/src/pages/demo/FloralBlanc/sections/UcapanDoa.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Ucapan = {
  id: number;
  nama: string;
  pesan: string;
};

const ucapanAwal: Ucapan[] = [
  {
    id: 1,
    nama: "Nadia Salsabila",
    pesan: "Congratulations! Kalian cocok banget, happy wedding ya berdua.",
  },
  {
    id: 2,
    nama: "Reza Firmansyah",
    pesan: "Barakallahu lakuma, semoga langgeng sampai kakek nenek.",
  },
  {
    id: 3,
    nama: "Clara Amelia",
    pesan: "So happy for you both! Wishing you a lifetime of love.",
  },
];

function UcapanDoa() {
  const [daftarUcapan, setDaftarUcapan] = useState(ucapanAwal);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !pesan.trim()) return;

    const ucapanBaru: Ucapan = {
      id: Date.now(),
      nama: nama.trim(),
      pesan: pesan.trim(),
    };

    // NOTE: masih di state lokal — belum kirim ke backend
    setDaftarUcapan([ucapanBaru, ...daftarUcapan]);
    setNama("");
    setPesan("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="ucapan"
      className="min-h-screen bg-[#fffaf7] text-[#3a3a3a] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c9a06e] mb-3">
        Doa Restu
      </p>
      <h2 className="font-heading text-3xl mb-10">Ucapan & Doa</h2>

      {/* Form kirim ucapan */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-none border border-[#c9a06e]/25  px-6 py-6 flex flex-col gap-4 mb-10"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full bg-[#fffaf7] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#c9a06e]"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapan & doa..."
          rows={3}
          className="w-full bg-[#fffaf7] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#c9a06e] resize-none"
        />
        <button
          type="submit"
          className="self-start bg-[#c9a06e] text-white rounded-full px-6 py-2.5 text-sm hover:bg-[#a8794a] transition-colors"
        >
          Kirim Ucapan
        </button>
      </form>

      {/* List ucapan */}
      <div className="w-full max-w-md flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {daftarUcapan.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-none border border-[#c9a06e]/25  px-5 py-4"
          >
            <p className="font-heading text-sm text-[#c9a06e] mb-1">
              {u.nama}
            </p>
            <p className="text-sm text-[#6b5a54]">{u.pesan}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UcapanDoa;
