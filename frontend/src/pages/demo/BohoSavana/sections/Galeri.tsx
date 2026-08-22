// frontend/src/pages/demo/BohoSavana/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#ead9c2] to-[#b5654a]", rot: "-rotate-3" },
  { grad: "from-[#b5654a] to-[#8f4a35]", rot: "rotate-2" },
  { grad: "from-[#7c8363] to-[#c3c9a8]", rot: "-rotate-1" },
  { grad: "from-[#ddb98a] to-[#6b4230]", rot: "rotate-3" },
  { grad: "from-[#c3c9a8] to-[#7c8363]", rot: "rotate-1" },
  { grad: "from-[#8f4a35] to-[#ddb98a]", rot: "-rotate-2" },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#f7efe3] text-[#3d2e1f] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#b5654a] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-16">Galeri</h2>

      {/* Polaroid scatter — tiap foto miring seperti ditempel manual */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 max-w-3xl">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`${item.rot} bg-white p-2.5 pb-6 shadow-lg shadow-[#6b4230]/15 w-32 sm:w-36 hover:rotate-0 hover:scale-105 transition-transform duration-300`}
          >
            <div
              className={`aspect-square bg-gradient-to-br ${item.grad}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;
