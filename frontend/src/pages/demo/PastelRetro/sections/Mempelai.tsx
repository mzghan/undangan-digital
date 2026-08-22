// frontend/src/pages/demo/PastelRetro/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai } from "../data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, rotate: -2 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

function KartuMempelai({
  nama,
  anakKe,
  orangTua,
  rot,
  delay,
}: {
  nama: string;
  anakKe: string;
  orangTua: string;
  rot: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`flex flex-col items-center bg-white border-[3px] border-[#2b1b12] rounded-[1.75rem] shadow-[5px_5px_0_#2b1b12] px-6 py-8 w-full max-w-[260px] ${rot}`}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 bg-gradient-to-br from-[#ffd9b3] to-[#d17a9e] border-[3px] border-[#2b1b12] overflow-hidden">
        {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
      </div>
      <h2 className="font-heading text-2xl text-[#2b1b12] mb-1">{nama}</h2>
      <p className="text-xs text-[#a8577c] mb-2 tracking-wide uppercase font-semibold">
        {anakKe}
      </p>
      <p className="text-sm text-[#5c4a45]">{orangTua}</p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <div
      id="mempelai"
      className="relative min-h-screen bg-[#fff3e4] text-[#2b1b12] flex flex-col items-center justify-center px-5 sm:px-10 py-20 text-center overflow-hidden"
    >
      <div className="absolute top-10 left-6 w-16 h-16 rounded-full bg-[#ffd9b3] border-[3px] border-[#2b1b12]/10" />
      <div className="absolute bottom-10 right-8 w-20 h-20 rounded-full bg-[#d17a9e]/30" />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#a8577c] mb-4 font-semibold"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love
      </motion.p>

      <motion.p
        className="max-w-sm text-sm sm:text-base text-[#5c4a45] mb-12 leading-relaxed"
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
        untuk hadir dan memberikan doa restu bagi pernikahan kami:
      </motion.p>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <KartuMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          rot="-rotate-2"
          delay={0.2}
        />

        <span className="font-heading text-3xl text-[#a8577c]">+</span>

        <KartuMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          rot="rotate-2"
          delay={0.4}
        />
      </div>
    </div>
  );
}

export default Mempelai;
