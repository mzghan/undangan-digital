import { motion } from "framer-motion";
// frontend/src/pages/demo/KoranLama/sections/Galeri.tsx
import { foto } from "../data";

const captions = [
  "Perkenalan, 2023",
  "Lamaran, 2026",
  "Hari Bahagia",
  "Keluarga Besar",
  "Sahabat Karib",
  "Kenangan Indah",
];

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-3">
        Rubrik Dokumentasi
      </p>
      <h2 className="font-black text-3xl mb-14 uppercase">Galeri Foto</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl lg:max-w-6xl w-full">
        {captions.map((caption, i) => (
          <figure
            key={i}
            className={`border border-[#2b2620] p-2 bg-[#f4ecd8] ${
              i % 2 === 0 ? "-rotate-1" : "rotate-1"
            }`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={foto.galeri[i]}
                alt={caption}
                className="w-full h-full object-cover grayscale contrast-125 sepia-[0.15]"
              />
            </div>
            <figcaption className="text-[10px] italic text-center pt-2 uppercase tracking-wide">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
