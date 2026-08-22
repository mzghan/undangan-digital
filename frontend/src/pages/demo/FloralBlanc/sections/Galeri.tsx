import { motion } from "framer-motion";
// frontend/src/pages/demo/FloralBlanc/sections/Galeri.tsx
import { foto } from "../data";

const captions = ["Perkenalan", "Lamaran", "Prewedding", "Kebersamaan"];

function Galeri() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      id="galeri"
      className="min-h-screen bg-white text-[#5c4a45] flex flex-col items-center px-6 py-20"
    >
      <p className="font-script text-2xl text-[#c9a06e] mb-2">Our Story</p>
      <h2 className="font-heading text-2xl mb-14 uppercase tracking-widest">Galeri</h2>

      {/* Satu kolom vertikal (lebar), foto berselang-seling kiri/kanan seperti editorial */}
      <div className="w-full max-w-sm lg:max-w-2xl flex flex-col gap-14">
        {foto.galeri.map((src, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 lg:gap-8 ${i % 2 === 1 ? "flex-row-reverse text-right" : ""}`}
          >
            <div className="w-32 h-40 lg:w-48 lg:h-60 shrink-0 overflow-hidden border border-[#c9a06e]/30">
              <img src={src} alt={captions[i] ?? `Momen ${i + 1}`} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8794a] mb-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-heading text-lg lg:text-xl">{captions[i] ?? "Kenangan"}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Galeri;
