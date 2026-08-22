// frontend/src/pages/demo/KoranLama/sections/Galeri.tsx

const captions = [
  "Perkenalan, 2023",
  "Lamaran, 2026",
  "Hari Bahagia",
  "Keluarga Besar",
  "Sahabat Karib",
  "Kenangan Indah",
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase mb-3">
        Rubrik Dokumentasi
      </p>
      <h2 className="font-black text-3xl mb-14 uppercase">Galeri Foto</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl w-full">
        {captions.map((caption, i) => (
          <figure
            key={i}
            className={`border border-[#2b2620] p-2 bg-[#f4ecd8] ${
              i % 2 === 0 ? "-rotate-1" : "rotate-1"
            }`}
          >
            <div className="aspect-square bg-[repeating-linear-gradient(45deg,_#2b2620_0,_#2b2620_1px,_transparent_1px,_transparent_10px)] opacity-70" />
            <figcaption className="text-[10px] italic text-center pt-2 uppercase tracking-wide">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Galeri;
