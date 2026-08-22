// frontend/src/pages/demo/DarkLuxuryNoir/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai } from "../data";
import BlobDecor from "../components/BlobDecor";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

function KartuMempelai({
  nama,
  anakKe,
  orangTua,
  delay,
}: {
  nama: string;
  anakKe: string;
  orangTua: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center bg-[#1e1e1e] rounded-3xl shadow-md shadow-[#d4af6a]/10 px-6 py-8 w-full max-w-[280px]"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 bg-gradient-to-br from-[#2a2a2a] to-[#d4af6a] overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
      </motion.div>
      <h2 className="font-heading text-2xl text-[#f0ede6] mb-1">{nama}</h2>
      <p className="text-xs text-[#d4af6a] mb-2 tracking-wide uppercase">
        {anakKe}
      </p>
      <p className="text-sm text-[#b0a894]">{orangTua}</p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <div
      id="mempelai"
      className="relative min-h-screen bg-[#121212] text-[#f0ede6] flex flex-col items-center justify-center px-5 sm:px-10 py-20 text-center overflow-hidden"
    >
      <BlobDecor posisi="top-left" warna="#d4af6a" />
      <BlobDecor posisi="bottom-right" warna="#8a8a8a" />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#d4af6a] mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love
      </motion.p>

      <motion.p
        className="max-w-sm text-sm sm:text-base text-[#b0a894] mb-12 leading-relaxed"
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
        untuk hadir dan memberikan doa restu bagi pernikahan kami:
      </motion.p>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <KartuMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.2}
        />

        <span className="font-heading text-2xl italic text-[#d4af6a]">&</span>

        <KartuMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          delay={0.4}
        />
      </div>
    </div>
  );
}

export default Mempelai;
