// frontend/src/pages/demo/PuspaBali/sections/Galeri.tsx

const gradients = [
  { grad: "from-[#f0e2b8] to-[#c9a24b]", tall: true },
  { grad: "from-[#c9a24b] to-[#a17c2f]", tall: false },
  { grad: "from-[#7a1f1f] to-[#d9a7a7]", tall: false },
  { grad: "from-[#e3c878] to-[#5c1f1f]", tall: false },
  { grad: "from-[#d9a7a7] to-[#7a1f1f]", tall: true },
  { grad: "from-[#a17c2f] to-[#e3c878]", tall: false },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#fdf8ef] text-[#3a2a1a] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c9a24b] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl bg-gradient-to-br ${item.grad} shadow-md shadow-[#c9a24b]/10 ${
              item.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
