// frontend/src/pages/demo/PastelRetro/sections/Galeri.tsx

const items = [
  { grad: "from-[#ffd9b3] to-[#d17a9e]", rot: "-rotate-6", size: "w-28 sm:w-32" },
  { grad: "from-[#d17a9e] to-[#b06a8c]", rot: "rotate-3", size: "w-24 sm:w-28" },
  { grad: "from-[#b06a8c] to-[#ffd9b3]", rot: "-rotate-2", size: "w-32 sm:w-36" },
  { grad: "from-[#ffd9b3] to-[#b06a8c]", rot: "rotate-6", size: "w-24 sm:w-28" },
  { grad: "from-[#d17a9e] to-[#ffd9b3]", rot: "-rotate-3", size: "w-28 sm:w-32" },
  { grad: "from-[#b06a8c] to-[#d17a9e]", rot: "rotate-2", size: "w-24 sm:w-28" },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#fff3e4] text-[#2b1b12] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#a8577c] mb-3 font-semibold">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      {/* Buku tempel ala scrapbook — ukuran & rotasi acak, bingkai stiker */}
      <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
        {items.map((item, i) => (
          <div
            key={i}
            className={`${item.rot} ${item.size} bg-white p-2 border-[3px] border-[#2b1b12] shadow-[4px_4px_0_#2b1b12] hover:rotate-0 hover:scale-105 transition-transform duration-300`}
          >
            <div className={`aspect-square bg-gradient-to-br ${item.grad}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;
