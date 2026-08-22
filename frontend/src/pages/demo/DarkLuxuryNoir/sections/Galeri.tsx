import { motion } from "framer-motion";
// frontend/src/pages/demo/DarkLuxuryNoir/sections/Galeri.tsx
import { foto } from "../data";

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-black text-[#f0ede6] flex flex-col items-center px-0 sm:px-6 py-20"
    >
      <p className="tracking-[0.4em] text-xs uppercase text-[#d4af6a] mb-3 px-6">
        Our Moments
      </p>
      <h2 className="font-heading text-4xl mb-12 px-6">Galeri</h2>

      {/* Filmstrip — scroll horizontal, gaya editorial */}
      <div className="w-full max-w-5xl lg:max-w-6xl overflow-x-auto pb-4">
        <div className="flex gap-3 px-6 snap-x snap-mandatory">
          {foto.galeri.map((src, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-56 sm:w-64 lg:w-72 aspect-[3/4] overflow-hidden border border-[#d4af6a]/30 relative"
            >
              <img src={src} alt={`Momen ${i + 1}`} className="w-full h-full object-cover grayscale" />
              <span className="absolute bottom-2 right-3 text-[10px] tracking-widest text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a] mt-4">
        Geser untuk lihat lebih banyak →
      </p>
    </motion.div>
  );
}

export default Galeri;
