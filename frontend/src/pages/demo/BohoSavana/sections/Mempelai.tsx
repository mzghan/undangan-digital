// frontend/src/pages/demo/BohoSavana/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai, foto } from "../data";
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
  foto,
}: {
  nama: string;
  anakKe: string;
  orangTua: string;
  delay: number;
  foto: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-5 bg-white rounded-[2rem] shadow-md shadow-[#b5654a]/10 px-6 py-6 w-full max-w-sm"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ead9c2] to-[#b5654a] overflow-hidden border-[3px] border-dashed border-[#b5654a]/40 p-0.5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        <img src={foto} alt={nama} className="w-full h-full object-cover rounded-full" />
      </motion.div>
      <div className="text-left">
        <h2 className="font-heading text-xl sm:text-2xl text-[#3d2e1f] mb-1">{nama}</h2>
        <p className="text-xs text-[#b5654a] mb-1 tracking-wide uppercase">
          {anakKe}
        </p>
        <p className="text-sm text-[#9c8b74]">{orangTua}</p>
      </div>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
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

      {/* Susunan bertumpuk vertikal dengan pembatas bergelombang */}
      <div className="flex flex-col items-center gap-6 w-full">
        <KartuMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.2}
          foto={foto.pria}
        />

        <svg width="80" height="20" viewBox="0 0 80 20" className="text-[#b5654a]">
          <path
            d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <KartuMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          delay={0.4}
          foto={foto.wanita}
        />
      </div>
    </motion.div>
  );
}

export default Mempelai;
