// frontend/src/pages/demo/Netflix/sections/RSVP.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";

type StatusKehadiran = "hadir" | "tidak-hadir" | "";

function RSVP() {
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState<StatusKehadiran>("");
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [terkirim, setTerkirim] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    if (!status) {
      setError("Pilih status kehadiran dulu");
      return;
    }

    setError("");
    setTerkirim(true);
    // NOTE: belum connect ke backend — ini baru simulasi submit di frontend
  };

  if (terkirim) {
    return (
      <div
        id="rsvp"
        className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-8 py-10 max-w-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="1.8" className="w-10 h-10 mx-auto mb-4">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-black text-2xl mb-3">Terima kasih, {nama}!</p>
          <p className="text-sm text-[#a3a3a3]">
            Sudah ditambahkan ke My List. Konfirmasi kehadiranmu sudah kami catat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="rsvp"
      className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-3">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-black text-3xl mb-10">Tambahkan ke List</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-8 flex flex-col gap-5"
      >
        <div>
          <label className="text-sm text-[#a3a3a3] block mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#E50914]"
          />
        </div>

        <div>
          <label className="text-sm text-[#a3a3a3] block mb-2">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 rounded px-4 py-2.5 text-sm font-medium transition-colors ${
                status === "hadir"
                  ? "bg-[#E50914] text-white"
                  : "bg-[#0a0a0a] text-[#a3a3a3] hover:bg-[#2a2a2a] border border-[#2a2a2a]"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 rounded px-4 py-2.5 text-sm font-medium transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#E50914] text-white"
                  : "bg-[#0a0a0a] text-[#a3a3a3] hover:bg-[#2a2a2a] border border-[#2a2a2a]"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm text-[#a3a3a3] block mb-1">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#E50914]"
            />
          </div>
        )}

        {error && <p className="text-[#E50914] text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#E50914] text-white rounded px-8 py-3.5 text-sm font-bold tracking-wide shadow-lg shadow-[#E50914]/30 hover:bg-[#f6121d] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </motion.div>
  );
}

export default RSVP;
