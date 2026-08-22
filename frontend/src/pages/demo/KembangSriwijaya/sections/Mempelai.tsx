// frontend/src/pages/demo/KembangSriwijaya/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai, foto } from "../data";
import SongketMotif from "../components/SongketMotif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

function ProfilMempelai({
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
      className="flex flex-col items-center"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full mb-5 ring-2 ring-[#d4af37] ring-offset-4 ring-offset-[#fff8ec] bg-gradient-to-br from-[#f3e5ab] to-[#d9b98a] overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        <img src={foto} alt={nama} className="w-full h-full object-cover" />
      </motion.div>
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#4a0e14] mb-1">
        {nama}
      </h2>
      <p className="text-xs sm:text-sm text-[#b8860b] mb-1 tracking-wide">
        {anakKe}
      </p>
      <p className="text-xs sm:text-sm text-[#6b4a2b] max-w-[220px]">
        {orangTua}
      </p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }} className="relative min-h-screen bg-[#fff8ec] text-[#4a0e14] flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-16 sm:py-20 text-center overflow-hidden">
      <SongketMotif posisi="top-left" />
      <SongketMotif posisi="bottom-right" />
      <motion.div
        className="w-16 h-[2px] bg-[#d4af37] mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase text-[#b8860b] mb-4"
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Assalamu'alaikum Warahmatullahi Wabarakatuh
      </motion.p>

      <motion.p
        className="max-w-md text-sm sm:text-base text-[#6b4a2b] mb-14 sm:mb-16 leading-relaxed px-2"
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
        menyelenggarakan pernikahan putra-putri kami:
      </motion.p>

      <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-14 md:gap-20">
        <ProfilMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.3}
          foto={foto.pria}
        />

        <motion.span
          className="font-serif text-3xl italic text-[#d4af37]"
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          &
        </motion.span>

        <ProfilMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          delay={0.5}
          foto={foto.wanita}
        />
      </div>

      <motion.div
        className="w-16 h-[2px] bg-[#d4af37] mt-14 sm:mt-16"
        variants={fadeUp}
        custom={0.6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

export default Mempelai;
