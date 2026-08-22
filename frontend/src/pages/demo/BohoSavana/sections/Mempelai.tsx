// frontend/src/pages/demo/BohoSavana/sections/Mempelai.tsx
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
      className="flex flex-col items-center bg-white rounded-3xl shadow-md shadow-[#b5654a]/10 px-6 py-8 w-full max-w-[280px]"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 bg-gradient-to-br from-[#ead9c2] to-[#b5654a] overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
      </motion.div>
      <h2 className="font-heading text-2xl text-[#3d2e1f] mb-1">{nama}</h2>
      <p className="text-xs text-[#b5654a] mb-2 tracking-wide uppercase">
        {anakKe}
      </p>
      <p className="text-sm text-[#9c8b74]">{orangTua}</p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <div
      id="mempelai"
      className="relative min-h-screen bg-[#f7efe3] text-[#3d2e1f] flex flex-col items-center justify-center px-5 sm:px-10 py-20 text-center overflow-hidden"
    >
      <BlobDecor posisi="top-left" warna="#b5654a" />
      <BlobDecor posisi="bottom-right" warna="#7c8363" />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#b5654a] mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love
      </motion.p>

      <motion.p
        className="max-w-sm text-sm sm:text-base text-[#9c8b74] mb-12 leading-relaxed"
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

        <span className="font-heading text-2xl italic text-[#b5654a]">&</span>

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
