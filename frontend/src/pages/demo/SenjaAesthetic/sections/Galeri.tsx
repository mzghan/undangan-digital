// frontend/src/pages/demo/SenjaAesthetic/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#f0dcd2] to-[#c17b5f]", tall: true },
  { grad: "from-[#c17b5f] to-[#a05a45]", tall: false },
  { grad: "from-[#90987f] to-[#c9d1bd]", tall: false },
  { grad: "from-[#e9c4ad] to-[#8a5a45]", tall: false },
  { grad: "from-[#c9d1bd] to-[#90987f]", tall: true },
  { grad: "from-[#a05a45] to-[#e9c4ad]", tall: false },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#faf5f0] text-[#3d2e28] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c17b5f] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#c17b5f]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
