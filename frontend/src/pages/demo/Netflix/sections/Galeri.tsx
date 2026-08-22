// frontend/src/pages/demo/Netflix/sections/Galeri.tsx
import { episodes } from "../data";

const gradients = [
  "from-[#3a3a3a] to-[#E50914]",
  "from-[#E50914] to-[#7a0509]",
  "from-[#2a2a2a] to-[#3a3a3a]",
  "from-[#7a0509] to-[#2a2a2a]",
  "from-[#3a3a3a] to-[#8a8a8a]",
  "from-[#E50914] to-[#2a2a2a]",
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-3">
        Episodes
      </p>
      <h2 className="font-black text-3xl mb-14">Galeri Momen</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {episodes.map((ep, i) => (
          <div
            key={ep.nomor}
            className={`relative aspect-video rounded-md bg-gradient-to-br ${gradients[i % gradients.length]} overflow-hidden group cursor-pointer border border-[#2a2a2a]`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 py-2">
              <p className="text-[10px] text-[#E50914] font-bold uppercase tracking-wide">
                Eps {ep.nomor}
              </p>
              <p className="text-xs text-white truncate">{ep.judul}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;
