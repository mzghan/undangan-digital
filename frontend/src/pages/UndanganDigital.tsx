import { useState } from "react";
import { Link } from "react-router-dom";
import { demoTemas, type FilterGrup } from "../data/demoTemas";

type FilterOption = "semua" | FilterGrup;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "hits", label: "Hits" },
  { value: "adat", label: "Adat" },
  { value: "trend", label: "Trend" },
];

function UndanganDigital() {
  const [filter, setFilter] = useState<FilterOption>("semua");

  const temaTersaring =
    filter === "semua"
      ? demoTemas
      : demoTemas.filter((tema) => tema.grup.includes(filter));

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-2">
        Undangan Digital
      </h1>
      <p className="text-gray-500 mb-6">
        Semua contoh tema undangan yang tersedia. Klik salah satu untuk
        melihat preview langsung.
      </p>

      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filter === opt.value
                ? "bg-rose-700 border-rose-700 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {temaTersaring.length === 0 ? (
        <p className="text-gray-500">Belum ada tema di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {temaTersaring.map((tema) => (
            <Link
              key={tema.slug}
              to={tema.path}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className={`relative w-full h-48 bg-gradient-to-br ${tema.gradient} flex items-center justify-center overflow-hidden`}
              >
                <span className="font-serif text-2xl text-white/90 drop-shadow-sm text-center px-4">
                  {tema.nama}
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium tracking-wide border border-white/70 rounded-full px-4 py-1.5">
                    Lihat Preview
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-1 rounded">
                  {tema.kategori}
                </span>
                <h2 className="text-lg font-semibold mt-2">{tema.nama}</h2>
                <p className="text-sm text-gray-500 mt-1">{tema.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UndanganDigital;
