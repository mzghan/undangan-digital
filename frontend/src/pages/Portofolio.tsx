import { useQuery } from "@tanstack/react-query";
import { getPortofolio } from "../api/portofolio";

function Portofolio() {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portofolio"],
    queryFn: getPortofolio,
  });

  if (isLoading) {
    return <p className="p-8 text-gray-500">Memuat portofolio...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-600">
        Gagal memuat data portofolio. Pastikan backend sedang berjalan.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-6">Portofolio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={item.gambar_url ?? undefined}
              alt={item.judul}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-1 rounded">
                {item.kategori}
              </span>
              <h2 className="text-lg font-semibold mt-2">{item.judul}</h2>
              {item.nama_klien && (
                <p className="text-sm text-gray-400 mt-1">{item.nama_klien}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portofolio;
