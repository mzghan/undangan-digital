// frontend/src/pages/demo/KoranLama/sections/UcapanDoa.tsx
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
    nama: "Ibu Suryani, Pembaca Setia",
    pesan:
      "Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
  },
  {
    id: 2,
    nama: "Bapak Wibowo, Kolega",
    pesan: "Barakallahu lakuma. Turut berbahagia atas pernikahan Ananda berdua.",
  },
  {
    id: 3,
    nama: "Sdri. Melati, Sahabat Lama",
    pesan: "Happy wedding! Semoga langgeng sampai kakek nenek ya.",
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
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-3">
        Rubrik Surat Pembaca
      </p>
      <h2 className="font-black text-3xl mb-10 uppercase">Ucapan & Doa</h2>

      {/* Form kirim ucapan */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-[#2b2620] flex flex-col gap-4 mb-16 px-6 py-6"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full bg-transparent border-b border-[#2b2620] px-1 py-2 text-sm focus:outline-none"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapan & doa..."
          rows={3}
          className="w-full bg-transparent border-b border-[#2b2620] px-1 py-2 text-sm focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="self-start border-2 border-[#2b2620] px-6 py-2 text-sm uppercase tracking-wide hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors"
        >
          Kirim Ucapan
        </button>
      </form>

      {/* List ucapan */}
      <div className="w-full max-w-md flex flex-col gap-4 max-h-[400px] overflow-y-auto">
        {daftarUcapan.map((u) => (
          <div
            key={u.id}
            className="border-b border-[#2b2620]/40 pb-4"
          >
            <p className="font-black text-sm mb-1 uppercase">{u.nama}</p>
            <p className="text-sm italic">"{u.pesan}"</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UcapanDoa;
