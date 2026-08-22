// frontend/src/pages/demo/KoranLama/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai, foto } from "../data";
import OrnamenKoran from "../components/OrnamenKoran";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
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
      className="flex flex-col items-center border border-[#2b2620] px-6 py-6 w-full max-w-[260px] bg-[#f4ecd8]"
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-[#2b2620] mb-4 bg-[repeating-linear-gradient(45deg,_#2b2620_0,_#2b2620_1px,_transparent_1px,_transparent_9px)] opacity-70">
        <img src={foto} alt={nama} className="w-full h-full object-cover grayscale" />
      </div>
      <h2 className="font-black text-2xl mb-1 uppercase tracking-tight">
        {nama}
      </h2>
      <p className="text-xs italic mb-2">{anakKe}</p>
      <p className="text-sm text-center">{orangTua}</p>
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
      className="relative min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center justify-center px-5 sm:px-10 py-16 sm:py-20 text-center overflow-hidden"
    >
      <OrnamenKoran posisi="top-left" />
      <OrnamenKoran posisi="bottom-right" />

      <div className="w-16 h-[2px] bg-[#2b2620] mb-6" />

      <motion.p
        className="tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Rubrik Keluarga
      </motion.p>

      <motion.p
        className="max-w-md text-sm sm:text-base mb-14 sm:mb-16 leading-relaxed px-2 text-justify"
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
        menyelenggarakan pernikahan putra-putri kami yang tersebut di bawah
        ini:
      </motion.p>

      <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-12 md:gap-16">
        <ProfilMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          delay={0.3}
          foto={foto.pria}
        />

        <span className="font-black text-3xl italic">&</span>

        <ProfilMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          delay={0.5}
          foto={foto.wanita}
        />
      </div>

      <div className="w-16 h-[2px] bg-[#2b2620] mt-14 sm:mt-16" />
    </motion.div>
  );
}

export default Mempelai;
