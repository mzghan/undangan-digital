// frontend/src/pages/demo/DarkLuxuryNoir/sections/Galeri.tsx

const gradients = [
  "from-[#2a2a2a] to-[#d4af6a]",
  "from-[#d4af6a] to-[#b8933f]",
  "from-[#8a8a8a] to-[#3a3a3a]",
  "from-[#3a3a3a] to-[#0a0a0a]",
  "from-[#3a3a3a] to-[#8a8a8a]",
  "from-[#b8933f] to-[#3a3a3a]",
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-black text-[#f0ede6] flex flex-col items-center px-0 sm:px-6 py-20"
    >
      <p className="tracking-[0.4em] text-xs uppercase text-[#d4af6a] mb-3 px-6">
        Our Moments
      </p>
      <h2 className="font-heading text-4xl mb-12 px-6">Galeri</h2>

      {/* Filmstrip — scroll horizontal, gaya editorial */}
      <div className="w-full max-w-5xl overflow-x-auto pb-4">
        <div className="flex gap-3 px-6 snap-x snap-mandatory">
          {gradients.map((grad, i) => (
            <div
              key={i}
              className={`snap-center shrink-0 w-56 sm:w-64 aspect-[3/4] bg-gradient-to-br ${grad} border border-[#d4af6a]/30 relative`}
            >
              <span className="absolute bottom-2 right-3 text-[10px] tracking-widest text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-[#8a8a8a] mt-4">
        Geser untuk lihat lebih banyak →
      </p>
    </div>
  );
}

export default Galeri;
