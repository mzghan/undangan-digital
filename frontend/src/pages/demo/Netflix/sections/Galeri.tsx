// frontend/src/pages/demo/Netflix/sections/Galeri.tsx
import { episodes, foto } from "../data";
import { motion } from "framer-motion";

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#E50914] font-bold mb-3">
        Episodes
      </p>
      <h2 className="font-black text-3xl mb-14">Galeri Momen</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl lg:max-w-6xl w-full">
        {episodes.map((ep, i) => (
          <div
            key={ep.nomor}
            className="relative aspect-video rounded-md overflow-hidden group cursor-pointer border border-[#2a2a2a]"
          >
            <img
              src={foto.galeri[i % foto.galeri.length]}
              alt={ep.judul}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 py-2">
              <p className="text-[10px] text-[#E50914] font-bold uppercase tracking-wide">
                Eps {ep.nomor}
              </p>
              <p className="text-xs text-white truncate">{ep.judul}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
