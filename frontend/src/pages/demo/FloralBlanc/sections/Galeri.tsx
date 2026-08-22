// frontend/src/pages/demo/FloralBlanc/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#faeaea] to-[#c9a06e]", tall: true },
  { grad: "from-[#c9a06e] to-[#a8794a]", tall: false },
  { grad: "from-[#a8bfa0] to-[#cfe0c8]", tall: false },
  { grad: "from-[#e8c9c9] to-[#9c6b6b]", tall: false },
  { grad: "from-[#cfe0c8] to-[#a8bfa0]", tall: true },
  { grad: "from-[#a8794a] to-[#e8c9c9]", tall: false },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#fffaf7] text-[#3a3a3a] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c9a06e] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#c9a06e]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
