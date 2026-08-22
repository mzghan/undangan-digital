import { motion } from "framer-motion";
// frontend/src/pages/demo/SenjaAesthetic/sections/Galeri.tsx
import { foto } from "../data";

const tinggi = ["h-56", "h-40", "h-48", "h-36", "h-52", "h-44"];

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-[#faf5f0] text-[#3d2a22] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c17b5f] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      {/* Masonry modern — tinggi bervariasi via CSS columns */}
      <div className="w-full max-w-3xl lg:max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {foto.galeri.map((src, i) => (
          <div
            key={i}
            className={`mb-4 break-inside-avoid rounded-xl overflow-hidden ${tinggi[i % tinggi.length]} shadow-md shadow-[#c17b5f]/10`}
          >
            <img src={src} alt={`Momen ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
