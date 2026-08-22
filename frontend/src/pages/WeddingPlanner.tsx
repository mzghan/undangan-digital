import { useQuery } from '@tanstack/react-query';
import { getPlannerPackages } from '../api/plannerPackage';
import { Link } from 'react-router-dom';

function WeddingPlanner() {
  const {
    data: packages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['planner-packages'],
    queryFn: getPlannerPackages,
  });

  if (isLoading) {
    return <p className="p-8 text-gray-500">Memuat paket...</p>;
  }

  if (isError) {
    return <p className="p-8 text-red-600">Gagal memuat data paket. Pastikan backend sedang berjalan.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-2">Wedding Planner</h1>
      <p className="text-gray-500 mb-8">Pilih paket perencana pernikahan yang sesuai kebutuhanmu.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages?.map((pkg) => {
          const fiturList = pkg.fitur.split(',');
          const waMessage = encodeURIComponent(`Halo, saya tertarik dengan ${pkg.nama_paket} seharga Rp ${pkg.harga.toLocaleString('id-ID')}.`);

          return (
            <div key={pkg.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <h2 className="text-xl font-bold text-rose-800">{pkg.nama_paket}</h2>
              <p className="text-2xl font-bold mt-2">Rp {pkg.harga.toLocaleString('id-ID')}</p>
              {pkg.jumlah_sheet && <p className="text-sm text-gray-400">{pkg.jumlah_sheet} fitur </p>}
              <p className="text-sm text-gray-500 mt-3">{pkg.deskripsi}</p>

              <ul className="mt-4 space-y-2 flex-1">
                {fiturList.map((fitur, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-rose-600">✓</span>
                    {fitur}
                  </li>
                ))}
              </ul>
              {pkg.nama_paket === 'Paket Basic' && (
                <Link to="/wedding-planner/trial" className="mt-6 border border-rose-700 text-rose-700 text-center py-2 rounded-md hover:bg-rose-50 transition-colors">
                  Coba Trial Gratis
                </Link>
              )}
              {pkg.nama_paket === 'Paket Premium' && (
                <Link to="/wedding-planner/trial-premium" className="mt-6 border border-rose-700 text-rose-700 text-center py-2 rounded-md hover:bg-rose-50 transition-colors">
                  Coba Trial Gratis
                </Link>
              )}
              {pkg.nama_paket === 'Paket Vendor Tracker' && (
                <Link to="/wedding-planner/trial-vendor-tracker" className="mt-6 border border-rose-700 text-rose-700 text-center py-2 rounded-md hover:bg-rose-50 transition-colors">
                  Coba Trial Gratis
                </Link>
              )}
              <a href={`https://wa.me/6282112989744?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="mt-6 bg-rose-700 text-white text-center py-2 rounded-md hover:bg-rose-800 transition-colors">
                Pesan Sekarang
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeddingPlanner;
