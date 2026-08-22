import { motion } from "framer-motion";
// frontend/src/pages/demo/KembangSriwijaya/sections/Galeri.tsx
import { foto } from "../data";

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }} id="galeri" className="min-h-screen bg-[#f5e9d6] text-[#2b1b12] flex flex-col items-center px-6 py-20">
      <p className="tracking-[0.3em] text-xs uppercase text-[#8a5a2b] mb-3">
        Our Moments
      </p>
      <h2 className="font-serif text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl lg:max-w-6xl w-full">
        {foto.galeri.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <img src={src} alt={`Momen ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
