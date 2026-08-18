// frontend/src/pages/demo/KembangSriwijaya/sections/UcapanDoa.tsx
import { useState } from "react";

type Ucapan = {
  id: number;
  nama: string;
  pesan: string;
};

const ucapanAwal: Ucapan[] = [
  {
    id: 1,
    nama: "Rina Wijaya",
    pesan:
      "Selamat menempuh hidup baru! Semoga sakinah, mawaddah, warahmah ya.",
  },
  {
    id: 2,
    nama: "Fajar Nugroho",
    pesan:
      "Barakallahu lakuma, semoga jadi keluarga yang samara dan diberkahi selalu.",
  },
  {
    id: 3,
    nama: "Dewi Anggraini",
    pesan: "Happy wedding! Doain kita nyusul ya wkwk. Bahagia selalu berdua.",
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
    <div className="min-h-screen bg-[#f5e9d6] text-[#2b1b12] flex flex-col items-center px-6 py-20">
      <p className="tracking-[0.3em] text-xs uppercase text-[#8a5a2b] mb-3">
        Doa Restu
      </p>
      <h2 className="font-serif text-3xl mb-10">Ucapan & Doa</h2>

      {/* Form kirim ucapan */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 mb-16"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full bg-white/60 border border-[#c9a876] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8a5a2b]"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapan & doa..."
          rows={3}
          className="w-full bg-white/60 border border-[#c9a876] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#8a5a2b] resize-none"
        />
        <button
          type="submit"
          className="self-start border border-[#8a5a2b] rounded-full px-6 py-2 text-sm tracking-wide hover:bg-[#8a5a2b] hover:text-[#f5e9d6] transition-colors"
        >
          Kirim Ucapan
        </button>
      </form>

      {/* List ucapan */}
      <div className="w-full max-w-md flex flex-col gap-4 max-h-[400px] overflow-y-auto">
        {daftarUcapan.map((u) => (
          <div
            key={u.id}
            className="bg-white/60 border border-[#c9a876] rounded-lg px-4 py-3"
          >
            <p className="font-serif text-sm mb-1">{u.nama}</p>
            <p className="text-sm text-[#5c4a3a]">{u.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UcapanDoa;
