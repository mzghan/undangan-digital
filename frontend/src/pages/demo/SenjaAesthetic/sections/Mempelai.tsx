// frontend/src/pages/demo/SenjaAesthetic/sections/Mempelai.tsx
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
      className="flex flex-col text-left"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="w-full aspect-[4/5] rounded-xl mb-5 bg-gradient-to-br from-[#f2c19a] to-[#c17b5f] shadow-md shadow-[#c17b5f]/20 overflow-hidden">
        <img src={foto} alt={nama} className="w-full h-full object-cover" />
      </div>
      <h2 className="font-heading text-2xl text-[#3d2a22] mb-1">{nama}</h2>
      <p className="text-xs text-[#c17b5f] mb-2 tracking-wide uppercase font-semibold">
        {anakKe}
      </p>
      <p className="text-sm text-[#8a7568]">{orangTua}</p>
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
      className="relative min-h-screen bg-white text-[#3d2a22] flex flex-col justify-center px-6 sm:px-10 py-20 overflow-hidden"
    >
      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#c17b5f] mb-3"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        With love
      </motion.p>

      <motion.p
        className="max-w-md text-sm sm:text-base text-[#8a7568] mb-12 leading-relaxed"
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
        untuk hadir dan memberikan doa restu bagi pernikahan kami:
      </motion.p>

      {/* Grid modern dua kolom, foto persegi besar */}
      <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-xl">
        <KartuMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.2}
          foto={foto.pria}
        />
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
