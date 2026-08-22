import { motion } from "framer-motion";
// frontend/src/pages/demo/BohoSavana/sections/Galeri.tsx
import { foto } from "../data";

const rotasi = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2"];

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-[#f7efe3] text-[#3d2e1f] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#b5654a] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-16">Galeri</h2>

      {/* Polaroid scatter — tiap foto miring seperti ditempel manual */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 max-w-3xl lg:max-w-5xl">
        {foto.galeri.map((src, i) => (
          <div
            key={i}
            className={`${rotasi[i % rotasi.length]} bg-white p-2.5 pb-6 shadow-lg shadow-[#6b4230]/15 w-32 sm:w-36 lg:w-44 hover:rotate-0 hover:scale-105 transition-transform duration-300`}
          >
            <div className="aspect-square overflow-hidden">
              <img src={src} alt={`Momen ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
