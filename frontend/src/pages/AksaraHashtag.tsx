import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateHashtag } from "../api/hashtag";

function AksaraHashtag() {
  const [namaPria, setNamaPria] = useState("");
  const [namaWanita, setNamaWanita] = useState("");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => generateHashtag(namaPria, namaWanita),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate();
  }

  function handleCopy(tag: string) {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-2">Aksara Hashtag</h1>
      <p className="text-gray-500 mb-8">
        Generate hashtag pernikahan unik dari nama panggilan kalian berdua.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nama Panggilan Pria
            </label>
            <input
              type="text"
              value={namaPria}
              onChange={(e) => setNamaPria(e.target.value)}
              required
              placeholder="misal: Ghani"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nama Panggilan Wanita
            </label>
            <input
              type="text"
              value={namaWanita}
              onChange={(e) => setNamaWanita(e.target.value)}
              required
              placeholder="misal: Nisa"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-rose-700 text-white py-2 rounded-md hover:bg-rose-800 disabled:opacity-50"
        >
          {mutation.isPending ? "Membuat hashtag..." : "Generate Hashtag"}
        </button>
      </form>

      {mutation.isSuccess && (
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">
            Pilihan Hashtag untuk Kalian
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mutation.data.hashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleCopy(tag)}
                className="flex items-center justify-between bg-rose-50 hover:bg-rose-100 text-rose-800 px-4 py-3 rounded-md text-sm font-medium transition-colors"
              >
                <span>{tag}</span>
                <span className="text-xs text-rose-500">
                  {copiedTag === tag ? "Tersalin!" : "Salin"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {mutation.isError && (
        <p className="mt-6 text-red-600">
          Gagal generate hashtag. Pastikan backend sedang berjalan.
        </p>
      )}
    </div>
  );
}

export default AksaraHashtag;
