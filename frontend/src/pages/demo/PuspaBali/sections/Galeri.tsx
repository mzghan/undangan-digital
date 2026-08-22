// frontend/src/pages/demo/PuspaBali/sections/Galeri.tsx

const gradients = [
  "from-[#e3c878] to-[#5c1f1f]",
  "from-[#c9a24b] to-[#2a0e0e]",
  "from-[#5c1f1f] to-[#e3c878]",
  "from-[#2a0e0e] to-[#c9a24b]",
  "from-[#e3c878] to-[#c9a24b]",
  "from-[#c9a24b] to-[#5c1f1f]",
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#2a0e0e] text-[#f5e6c8] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.4em] text-xs uppercase text-[#c9a24b] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-16">Galeri</h2>

      {/* Medali bundar berselang-seling naik-turun, seperti gerbang pura */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-10 max-w-3xl">
        {gradients.map((grad, i) => (
          <div
            key={i}
            className={`${i % 2 === 1 ? "mt-8" : ""} w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${grad} border-2 border-[#c9a24b]/70 shadow-lg shadow-black/30`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
