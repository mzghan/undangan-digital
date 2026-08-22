import { motion } from "framer-motion";
// frontend/src/pages/demo/PastelRetro/sections/Galeri.tsx
import { foto } from "../data";

const gaya = [
  { rot: "-rotate-6", size: "w-28 sm:w-32 lg:w-40" },
  { rot: "rotate-3", size: "w-24 sm:w-28 lg:w-36" },
  { rot: "-rotate-2", size: "w-32 sm:w-36 lg:w-44" },
  { rot: "rotate-6", size: "w-24 sm:w-28 lg:w-36" },
  { rot: "-rotate-3", size: "w-28 sm:w-32 lg:w-40" },
  { rot: "rotate-2", size: "w-24 sm:w-28 lg:w-36" },
];

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-[#fff3e4] text-[#2b1b12] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#a8577c] mb-3 font-semibold">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      {/* Buku tempel ala scrapbook — ukuran & rotasi acak, bingkai stiker */}
      <div className="flex flex-wrap justify-center gap-6 max-w-3xl lg:max-w-5xl">
        {foto.galeri.map((src, i) => (
          <div
            key={i}
            className={`${gaya[i % gaya.length].rot} ${gaya[i % gaya.length].size} bg-white p-2 border-[3px] border-[#2b1b12] shadow-[4px_4px_0_#2b1b12] hover:rotate-0 hover:scale-105 transition-transform duration-300`}
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
