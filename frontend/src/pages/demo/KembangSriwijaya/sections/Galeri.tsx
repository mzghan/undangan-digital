// frontend/src/pages/demo/KembangSriwijaya/sections/Galeri.tsx

const gradients = [
  "from-[#8a5a2b] to-[#2b1b12]",
  "from-[#d9b98a] to-[#8a5a2b]",
  "from-[#2b1b12] to-[#5c4a3a]",
  "from-[#c9a876] to-[#2b1b12]",
  "from-[#5c4a3a] to-[#d9b98a]",
  "from-[#2b1b12] to-[#8a5a2b]",
];

function Galeri() {
  return (
    <div className="min-h-screen bg-[#f5e9d6] text-[#2b1b12] flex flex-col items-center px-6 py-20">
      <p className="tracking-[0.3em] text-xs uppercase text-[#8a5a2b] mb-3">
        Our Moments
      </p>
      <h2 className="font-serif text-3xl mb-14">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {gradients.map((gradient, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg bg-gradient-to-br ${gradient}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
