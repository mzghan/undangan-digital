// frontend/src/pages/demo/KoranLama/sections/Cover.tsx
import { mempelai, tamuDefault, edisi } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-[#f4ecd8] text-[#2b2620] font-serif">
      <div className="w-full max-w-md border-2 border-[#2b2620] px-5 py-6">
        {/* Baris info edisi */}
        <div className="flex justify-between text-[9px] uppercase tracking-widest border-b border-[#2b2620] pb-2 mb-3">
          <span>{edisi.tanggalTerbit}</span>
          <span>{edisi.edisiKe}</span>
        </div>

        {/* Masthead */}
        <h1 className="text-center font-black text-4xl sm:text-5xl tracking-tight mb-1 uppercase">
          {edisi.namaKoran}
        </h1>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase mb-3">
          Kabar Bahagia dari Dua Keluarga
        </p>

        <div className="border-y-4 border-double border-[#2b2620] py-1 mb-5 flex justify-between text-[9px] uppercase tracking-widest">
          <span>{edisi.harga}</span>
          <span>Terbit Sekali Seumur Hidup</span>
        </div>

        {/* Headline utama */}
        <p className="text-center text-[11px] uppercase tracking-[0.25em] mb-2">
          Headline Utama
        </p>
        <h2 className="text-center font-black text-3xl sm:text-4xl leading-tight mb-4">
          {mempelai.pria.panggilan} &amp; {mempelai.wanita.panggilan}
          <br />
          Resmi Menikah
        </h2>

        <div className="w-full aspect-[4/3] border border-[#2b2620] bg-[repeating-linear-gradient(45deg,_#2b2620_0,_#2b2620_1px,_transparent_1px,_transparent_10px)] opacity-70 mb-4" />
        <p className="text-[10px] text-center italic mb-6">
          (Foto pasangan pengantin — dokumentasi keluarga)
        </p>

        <p className="text-sm leading-relaxed text-justify mb-6 first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left">
          Dengan penuh syukur, kami kabarkan kepada khalayak ramai bahwa
          {" "}{mempelai.pria.panggilan} dan {mempelai.wanita.panggilan} akan
          melangsungkan pernikahan. Kehadiran serta doa restu Bapak/Ibu/Saudara/i
          menjadi kabar gembira yang paling dinanti.
        </p>

        <div className="border border-dashed border-[#2b2620] px-4 py-3 mb-6 text-center">
          <p className="text-[10px] uppercase tracking-widest mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBuka}
            className="border-2 border-[#2b2620] rounded-none px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#2b2620] hover:text-[#f4ecd8] transition-colors"
          >
            Baca Selengkapnya »
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cover;
