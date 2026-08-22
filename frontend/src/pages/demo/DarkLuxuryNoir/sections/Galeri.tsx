// frontend/src/pages/demo/DarkLuxuryNoir/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#2a2a2a] to-[#d4af6a]", tall: true },
  { grad: "from-[#d4af6a] to-[#b8933f]", tall: false },
  { grad: "from-[#8a8a8a] to-[#3a3a3a]", tall: false },
  { grad: "from-[#3a3a3a] to-[#0a0a0a]", tall: false },
  { grad: "from-[#3a3a3a] to-[#8a8a8a]", tall: true },
  { grad: "from-[#b8933f] to-[#3a3a3a]", tall: false },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#121212] text-[#f0ede6] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#d4af6a] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#d4af6a]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
