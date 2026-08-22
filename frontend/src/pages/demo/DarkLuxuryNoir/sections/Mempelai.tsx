// frontend/src/pages/demo/DarkLuxuryNoir/sections/Mempelai.tsx
import { motion, type Variants } from "framer-motion";
import { mempelai } from "../data";

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
  align,
  delay,
}: {
  nama: string;
  anakKe: string;
  orangTua: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      className={`flex flex-col ${align === "left" ? "items-start text-left" : "items-end text-right sm:items-start sm:text-left"} gap-3`}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="w-20 h-28 sm:w-24 sm:h-32 border border-[#d4af6a]/40 bg-gradient-to-br from-[#2a2a2a] to-black">
        {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
      </div>
      <h2 className="font-heading text-3xl text-[#f0ede6]">{nama}</h2>
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af6a]">
        {anakKe}
      </p>
      <p className="text-sm text-[#8a8a8a] max-w-[220px]">{orangTua}</p>
    </motion.div>
  );
}

function Mempelai() {
  return (
    <div
      id="mempelai"
      className="relative min-h-screen bg-[#121212] text-[#f0ede6] flex flex-col items-center justify-center px-6 sm:px-14 py-24 overflow-hidden"
    >
      <motion.p
        className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#d4af6a] mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Mempelai
      </motion.p>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-10 sm:gap-6 items-start">
        <ProfilMempelai
          nama={mempelai.pria.nama}
          anakKe={mempelai.pria.anakKe}
          orangTua={mempelai.pria.orangTua}
          align="left"
          delay={0.1}
        />

        <div className="hidden sm:flex flex-col items-center justify-start pt-10">
          <span className="w-px h-24 bg-[#d4af6a]/40" />
          <span className="font-heading text-2xl italic text-[#d4af6a] my-2">&amp;</span>
          <span className="w-px h-24 bg-[#d4af6a]/40" />
        </div>

        <ProfilMempelai
          nama={mempelai.wanita.nama}
          anakKe={mempelai.wanita.anakKe}
          orangTua={mempelai.wanita.orangTua}
          align="right"
          delay={0.3}
        />
      </div>
    </div>
  );
}

export default Mempelai;
