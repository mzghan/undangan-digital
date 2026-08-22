// frontend/src/pages/demo/BohoSavana/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#ead9c2] to-[#b5654a]", tall: true },
  { grad: "from-[#b5654a] to-[#8f4a35]", tall: false },
  { grad: "from-[#7c8363] to-[#c3c9a8]", tall: false },
  { grad: "from-[#ddb98a] to-[#6b4230]", tall: false },
  { grad: "from-[#c3c9a8] to-[#7c8363]", tall: true },
  { grad: "from-[#8f4a35] to-[#ddb98a]", tall: false },
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
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#b5654a]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
