// frontend/src/pages/demo/KembangSriwijaya/sections/RSVP.tsx
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
      <div className="min-h-screen bg-[#2b1b12] text-[#f5e9d6] flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-serif text-2xl mb-3">Terima kasih, {nama}!</p>
        <p className="text-sm text-[#d9b98a]">
          Konfirmasi kehadiranmu sudah kami catat.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }} className="min-h-screen bg-[#2b1b12] text-[#f5e9d6] flex flex-col items-center px-6 py-20">
      <p className="tracking-[0.3em] text-xs uppercase text-[#d9b98a] mb-3">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-serif text-3xl mb-10">RSVP</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-5"
      >
        <div>
          <label className="text-sm text-[#d9b98a] block mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-transparent border border-[#5c4a3a] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#d9b98a]"
          />
        </div>

        <div>
          <label className="text-sm text-[#d9b98a] block mb-2">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm border transition-colors ${
                status === "hadir"
                  ? "bg-[#d9b98a] text-[#2b1b12] border-[#d9b98a]"
                  : "border-[#5c4a3a] hover:border-[#d9b98a]"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm border transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#d9b98a] text-[#2b1b12] border-[#d9b98a]"
                  : "border-[#5c4a3a] hover:border-[#d9b98a]"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm text-[#d9b98a] block mb-1">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-transparent border border-[#5c4a3a] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#d9b98a]"
            />
          </div>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="border border-[#d9b98a] rounded-full px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#d9b98a] hover:text-[#2b1b12] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </motion.div>
  );
}

export default RSVP;
