// frontend/src/pages/demo/KoranLama/sections/RSVP.tsx
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
        className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <p className="font-black text-2xl mb-3">Terima kasih, {nama}!</p>
        <p className="text-sm italic">
          Konfirmasi kehadiranmu sudah tercatat di meja redaksi kami.
        </p>
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
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-3">
        Kupon Konfirmasi Kehadiran
      </p>
      <h2 className="font-black text-3xl mb-3 uppercase">RSVP</h2>
      <p className="text-xs italic mb-8 flex items-center gap-2">
        <span>✂</span> Gunting dan isi kupon di bawah ini
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-2 border-dashed border-[#2b2620] flex flex-col gap-5 px-6 py-8"
      >
        <div>
          <label className="text-sm block mb-1 uppercase tracking-wide">
            Nama
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-transparent border-b border-[#2b2620] px-1 py-2 text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm block mb-2 uppercase tracking-wide">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 px-4 py-2 text-sm border border-[#2b2620] transition-colors ${
                status === "hadir"
                  ? "bg-[#2b2620] text-[#f4ecd8]"
                  : "hover:bg-[#2b2620]/10"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 px-4 py-2 text-sm border border-[#2b2620] transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#2b2620] text-[#f4ecd8]"
                  : "hover:bg-[#2b2620]/10"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm block mb-1 uppercase tracking-wide">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-transparent border-b border-[#2b2620] px-1 py-2 text-sm focus:outline-none"
            />
          </div>
        )}

        {error && <p className="text-red-800 text-sm">{error}</p>}

        <button
          type="submit"
          className="border-2 border-[#2b2620] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </motion.div>
  );
}

export default RSVP;
