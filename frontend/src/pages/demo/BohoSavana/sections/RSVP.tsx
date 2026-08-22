// frontend/src/pages/demo/BohoSavana/sections/RSVP.tsx
import { useState } from "react";
import type { FormEvent } from "react";

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
        className="min-h-screen bg-[#f0e4d0] text-[#3d2e1f] flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="bg-white rounded-[2rem] shadow-md shadow-[#b5654a]/10 px-8 py-10 max-w-sm">
          <p className="font-heading text-2xl mb-3">Terima kasih, {nama}!</p>
          <p className="text-sm text-[#9c8b74]">
            Konfirmasi kehadiranmu sudah kami catat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="rsvp"
      className="min-h-screen bg-[#f0e4d0] text-[#3d2e1f] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#b5654a] mb-3">
        Konfirmasi Kehadiran
      </p>
      <h2 className="font-heading text-3xl mb-10">RSVP</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-md shadow-[#b5654a]/10 px-6 py-8 flex flex-col gap-5"
      >
        <div>
          <label className="text-sm text-[#9c8b74] block mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full bg-[#f7efe3] border border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b5654a]"
          />
        </div>

        <div>
          <label className="text-sm text-[#9c8b74] block mb-2">
            Status Kehadiran
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("hadir")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                status === "hadir"
                  ? "bg-[#b5654a] text-white"
                  : "bg-[#f7efe3] text-[#9c8b74] hover:bg-[#ead9c2]"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setStatus("tidak-hadir")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                status === "tidak-hadir"
                  ? "bg-[#b5654a] text-white"
                  : "bg-[#f7efe3] text-[#9c8b74] hover:bg-[#ead9c2]"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {status === "hadir" && (
          <div>
            <label className="text-sm text-[#9c8b74] block mb-1">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full bg-[#f7efe3] border border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b5654a]"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#b5654a] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#b5654a]/30 hover:bg-[#8f4a35] transition-colors mt-2"
        >
          Kirim Konfirmasi
        </button>
      </form>
    </div>
  );
}

export default RSVP;
