import { motion } from "framer-motion";
// frontend/src/pages/demo/PuspaBali/sections/Galeri.tsx
import { foto } from "../data";

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-[#2a0e0e] text-[#f5e6c8] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.4em] text-xs uppercase text-[#c9a24b] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-16">Galeri</h2>

      {/* Medali bundar berselang-seling naik-turun, seperti gerbang pura */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-10 max-w-3xl lg:max-w-5xl">
        {foto.galeri.map((src, i) => (
          <div
            key={i}
            className={`${i % 2 === 1 ? "mt-8" : ""} w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-[#c9a24b]/70 shadow-lg shadow-black/30`}
          >
            <img src={src} alt={`Momen ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
