// frontend/src/pages/demo/FloralBlanc/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai, foto } from "../data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

function BarisMempelai({
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
      className="flex flex-col items-center text-center gap-3 py-8"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="w-24 h-32 rounded-[50%] overflow-hidden bg-gradient-to-b from-[#e8c9c9] via-[#c9a06e] to-[#9c6b6b] border border-[#c9a06e]/40">
        <img src={foto} alt={nama} className="w-full h-full object-cover" />
      </div>
      <h2 className="font-heading text-2xl text-[#5c4a45] uppercase tracking-wide">{nama}</h2>
      <p className="text-[10px] text-[#a8794a] tracking-[0.2em] uppercase">
        {anakKe}
      </p>
      <p className="text-sm text-[#8a7570] max-w-[240px]">{orangTua}</p>
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
      className="min-h-screen bg-[#faf6f0] text-[#5c4a45] flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <motion.p
        className="font-script text-2xl text-[#c9a06e] mb-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love,
      </motion.p>

      <motion.p
        className="max-w-sm text-sm text-[#8a7570] mb-4 leading-relaxed"
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
        untuk hadir dan memberikan doa restu bagi pernikahan kami:
      </motion.p>

      {/* Susunan vertikal satu kolom, seperti kartu undangan cetak */}
      <div className="w-full max-w-xs flex flex-col divide-y divide-[#c9a06e]/25">
        <BarisMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.2}
          foto={foto.pria}
        />
        <BarisMempelai
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
