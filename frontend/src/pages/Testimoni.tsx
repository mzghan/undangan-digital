import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimoni, createTestimoni } from "../api/testimoni";

function Testimoni() {
  const queryClient = useQueryClient();

  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(5);
  const [isi, setIsi] = useState("");

  const { data: testimoniList, isLoading } = useQuery({
    queryKey: ["testimoni"],
    queryFn: getTestimoni,
  });

  const mutation = useMutation({
    mutationFn: createTestimoni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimoni"] });
      setNama("");
      setRating(5);
      setIsi("");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ nama, rating, isi });
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-6">Testimoni</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm mb-8 space-y-4"
      >
        <h2 className="font-semibold text-lg">Bagikan Pengalamanmu</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} bintang
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Ucapan / Testimoni
          </label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-800 disabled:opacity-50"
        >
          {mutation.isPending ? "Mengirim..." : "Kirim Testimoni"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Memuat testimoni...</p>
      ) : (
        <div className="space-y-4">
          {testimoniList?.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{t.nama}</span>
                <span className="text-rose-600 text-sm">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{t.isi}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Testimoni;
