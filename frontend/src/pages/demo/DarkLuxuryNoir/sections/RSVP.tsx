// frontend/src/pages/demo/DarkLuxuryNoir/sections/RSVP.tsx
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
        className="min-h-screen bg-[#1a1a1a] text-[#f0ede6] flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="bg-[#1e1e1e] rounded-none border border-[#d4af6a]/20 shadow-md shadow-[#d4af6a]/10 px-8 py-10 max-w-sm">
          <p className="font-heading text-2xl mb-3">Terima kasih, {nama}!</p>
          <p className="text-sm text-[#b0a894]">
            Konfirmasi kehadiranmu sudah kami catat.
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
      className="min-h-screen bg-[#1a1a1a] text-[#f0ede6] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#d4af6a] mb-3">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-heading text-3xl mb-10">RSVP</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1e1e1e] rounded-none border border-[#d4af6a]/20 shadow-md shadow-[#d4af6a]/10 px-6 py-8 flex flex-col gap-5"
      >
        <div>
          <label className="text-sm text-[#b0a894] block mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-[#121212] border border-transparent rounded-none border border-[#d4af6a]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af6a]"
          />
        </div>

        <div>
          <label className="text-sm text-[#b0a894] block mb-2">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 rounded-none border border-[#d4af6a]/20 px-4 py-2.5 text-sm transition-colors ${
                status === "hadir"
                  ? "bg-[#d4af6a] text-white"
                  : "bg-[#121212] text-[#b0a894] hover:bg-[#2a2a2a]"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 rounded-none border border-[#d4af6a]/20 px-4 py-2.5 text-sm transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#d4af6a] text-white"
                  : "bg-[#121212] text-[#b0a894] hover:bg-[#2a2a2a]"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm text-[#b0a894] block mb-1">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-[#121212] border border-transparent rounded-none border border-[#d4af6a]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af6a]"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#d4af6a] text-white rounded-none px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#d4af6a]/30 hover:bg-[#b8933f] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </motion.div>
  );
}

export default RSVP;
