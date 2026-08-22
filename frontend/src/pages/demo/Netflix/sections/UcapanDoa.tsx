// frontend/src/pages/demo/Netflix/sections/UcapanDoa.tsx
import { useState } from "react";

type Ucapan = {
  id: number;
  nama: string;
  pesan: string;
};

const ucapanAwal: Ucapan[] = [
  {
    id: 1,
    nama: "Dinda Ayu",
    pesan: "10/10, chemistry-nya dapet banget! Happy wedding kalian berdua.",
  },
  {
    id: 2,
    nama: "Farrel Ibrahim",
    pesan: "Must watch! Barakallahu lakuma, semoga sakinah mawaddah warahmah.",
  },
  {
    id: 3,
    nama: "Talita Zahra",
    pesan: "Series terbaik tahun ini. Nangis terharu liat kalian sampai sini.",
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
    <div
      id="ucapan"
      className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-3">
        Ratings & Reviews
      </p>
      <h2 className="font-black text-3xl mb-10">Ucapan & Doa</h2>

      {/* Form kirim ucapan */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-6 flex flex-col gap-4 mb-10"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#E50914]"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis review-mu buat pengantin..."
          rows={3}
          className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#E50914] resize-none"
        />
        <button
          type="submit"
          className="self-start bg-[#E50914] text-white rounded px-6 py-2.5 text-sm font-bold hover:bg-[#f6121d] transition-colors"
        >
          Kirim Ucapan
        </button>
      </form>

      {/* List ucapan */}
      <div className="w-full max-w-md flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {daftarUcapan.map((u) => (
          <div
            key={u.id}
            className="bg-[#181818] border border-[#2a2a2a] rounded-md px-5 py-4"
          >
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="#E50914" className="w-3 h-3">
                  <polygon points="10,1 12.5,7 19,7.5 14,11.8 15.5,18 10,14.5 4.5,18 6,11.8 1,7.5 7.5,7" />
                </svg>
              ))}
            </div>
            <p className="font-bold text-sm text-white mb-1">{u.nama}</p>
            <p className="text-sm text-[#a3a3a3]">{u.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UcapanDoa;
