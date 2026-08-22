// frontend/src/pages/demo/DarkLuxuryNoir/sections/UcapanDoa.tsx
import { useState } from "react";

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
    <div
      id="ucapan"
      className="min-h-screen bg-[#121212] text-[#f0ede6] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#d4af6a] mb-3">
        Doa Restu
      </p>
      <h2 className="font-heading text-3xl mb-10">Ucapan & Doa</h2>

      {/* Form kirim ucapan */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1e1e1e] rounded-3xl shadow-md shadow-[#d4af6a]/10 px-6 py-6 flex flex-col gap-4 mb-10"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full bg-[#121212] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af6a]"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapan & doa..."
          rows={3}
          className="w-full bg-[#121212] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af6a] resize-none"
        />
        <button
          type="submit"
          className="self-start bg-[#d4af6a] text-white rounded-full px-6 py-2.5 text-sm hover:bg-[#b8933f] transition-colors"
        >
          Kirim Ucapan
        </button>
      </form>

      {/* List ucapan */}
      <div className="w-full max-w-md flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {daftarUcapan.map((u) => (
          <div
            key={u.id}
            className="bg-[#1e1e1e] rounded-2xl shadow-sm shadow-[#d4af6a]/10 px-5 py-4"
          >
            <p className="font-heading text-sm text-[#d4af6a] mb-1">
              {u.nama}
            </p>
            <p className="text-sm text-[#d8cbb0]">{u.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UcapanDoa;
