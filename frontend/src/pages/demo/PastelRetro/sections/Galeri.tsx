// frontend/src/pages/demo/PastelRetro/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#f7dde9] to-[#d17a9e]", tall: true },
  { grad: "from-[#d17a9e] to-[#a8577c]", tall: false },
  { grad: "from-[#7fb8a4] to-[#bfe3d3]", tall: false },
  { grad: "from-[#ffd9b3] to-[#b06a8c]", tall: false },
  { grad: "from-[#bfe3d3] to-[#7fb8a4]", tall: true },
  { grad: "from-[#a8577c] to-[#ffd9b3]", tall: false },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#fdf6f0] text-[#5b4636] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#d17a9e] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#d17a9e]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
