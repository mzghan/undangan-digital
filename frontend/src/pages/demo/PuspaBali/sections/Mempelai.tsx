// frontend/src/pages/demo/PuspaBali/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai, foto } from "../data";

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
      className="flex flex-col items-center border border-[#c9a24b]/40 px-6 py-8 w-full max-w-[280px]"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div
        className="w-24 h-28 sm:w-28 sm:h-32 mb-5 bg-gradient-to-br from-[#e3c878] to-[#5c1f1f] border border-[#c9a24b]/60"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        <img src={foto} alt={nama} className="w-full h-full object-cover" style={{ clipPath: "inherit" }} />
      </div>
      <h2 className="font-heading text-2xl text-[#f5e6c8] mb-1">{nama}</h2>
      <p className="text-xs text-[#c9a24b] mb-2 tracking-[0.2em] uppercase">
        {anakKe}
      </p>
      <p className="text-sm text-[#e3c878]/70">{orangTua}</p>
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
      className="relative min-h-screen bg-[#3d1414] text-[#f5e6c8] flex flex-col items-center justify-center px-5 sm:px-10 py-20 text-center overflow-hidden"
    >
      <motion.p
        className="tracking-[0.4em] text-[10px] sm:text-xs uppercase text-[#c9a24b] mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love
      </motion.p>

      <motion.p
        className="max-w-sm text-sm sm:text-base text-[#e3c878]/70 mb-12 leading-relaxed"
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
          foto={foto.pria}
        />

        <span className="font-heading text-2xl italic text-[#c9a24b]">&amp;</span>

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
