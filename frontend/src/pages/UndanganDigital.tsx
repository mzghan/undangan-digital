import { useQuery } from "@tanstack/react-query";
import { getTemas } from "../api/temas";

function UndanganDigital() {
  const {
    data: temas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["temas"],
    queryFn: getTemas,
  });

  if (isLoading) {
    return <p className="p-8 text-gray-500">Memuat tema...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-600">
        Gagal memuat data tema. Pastikan backend sedang berjalan.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-6">
        Undangan Digital
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {temas?.map((tema) => (
          <div
            key={tema.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={tema.gambar_url ?? undefined}
              alt={tema.nama}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-1 rounded">
                {tema.kategori}
              </span>
              <h2 className="text-lg font-semibold mt-2">{tema.nama}</h2>
              <p className="text-sm text-gray-500 mt-1">{tema.deskripsi}</p>
              <p className="text-rose-800 font-bold mt-3">
                Rp {tema.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UndanganDigital;
