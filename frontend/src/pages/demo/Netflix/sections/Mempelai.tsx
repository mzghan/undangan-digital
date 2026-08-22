// frontend/src/pages/demo/Netflix/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai } from "../data";
import PlayMotif from "../components/PlayMotif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

function KartuCast({
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
      className="flex flex-col items-center bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-8 w-full max-w-[280px]"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 bg-gradient-to-br from-[#3a3a3a] to-[#E50914] overflow-hidden ring-2 ring-[#E50914]/40"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
      </motion.div>
      <p className="text-[10px] uppercase tracking-widest text-[#E50914] font-bold mb-2">
        Starring
      </p>
      <h2 className="font-black text-2xl text-white mb-1">{nama}</h2>
      <p className="text-xs text-[#E50914] mb-2 tracking-wide uppercase">
        {anakKe}
      </p>
      <p className="text-sm text-[#a3a3a3]">{orangTua}</p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <div
      id="mempelai"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-5 sm:px-10 py-20 text-center overflow-hidden"
    >
      <PlayMotif posisi="top-left" />
      <PlayMotif posisi="bottom-right" />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#E50914] font-bold mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Cast & Crew
      </motion.p>

      <motion.p
        className="max-w-sm text-sm sm:text-base text-[#a3a3a3] mb-12 leading-relaxed"
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
        <KartuCast
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.2}
        />

        <span className="font-black text-2xl text-[#E50914]">&</span>

        <KartuCast
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
