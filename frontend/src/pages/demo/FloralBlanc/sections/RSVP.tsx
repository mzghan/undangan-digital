// frontend/src/pages/demo/FloralBlanc/sections/RSVP.tsx
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
        className="min-h-screen bg-[#fdf3f0] text-[#3a3a3a] flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="bg-white rounded-none border border-[#c9a06e]/25  px-8 py-10 max-w-sm">
          <p className="font-heading text-2xl mb-3">Terima kasih, {nama}!</p>
          <p className="text-sm text-[#a89a94]">
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
      className="min-h-screen bg-[#fdf3f0] text-[#3a3a3a] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c9a06e] mb-3">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-heading text-3xl mb-10">RSVP</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-none border border-[#c9a06e]/25  px-6 py-8 flex flex-col gap-5"
      >
        <div>
          <label className="text-sm text-[#a89a94] block mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-[#fffaf7] border border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a06e]"
          />
        </div>

        <div>
          <label className="text-sm text-[#a89a94] block mb-2">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                status === "hadir"
                  ? "bg-[#c9a06e] text-white"
                  : "bg-[#fffaf7] text-[#a89a94] hover:bg-[#faeaea]"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#c9a06e] text-white"
                  : "bg-[#fffaf7] text-[#a89a94] hover:bg-[#faeaea]"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm text-[#a89a94] block mb-1">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-[#fffaf7] border border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a06e]"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#c9a06e] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#c9a06e]/30 hover:bg-[#a8794a] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </motion.div>
  );
}

export default RSVP;
