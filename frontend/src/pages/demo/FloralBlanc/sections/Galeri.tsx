// frontend/src/pages/demo/FloralBlanc/sections/Galeri.tsx

const gradients = [
  "from-[#ead9d0] to-[#c9a06e]",
  "from-[#c9a06e] to-[#9c6b6b]",
  "from-[#e8c9c9] to-[#c9a06e]",
  "from-[#9c6b6b] to-[#e8c9c9]",
];

const captions = ["Perkenalan", "Lamaran", "Prewedding", "Kebersamaan"];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-white text-[#5c4a45] flex flex-col items-center px-6 py-20"
    >
      <p className="font-script text-2xl text-[#c9a06e] mb-2">Our Story</p>
      <h2 className="font-heading text-2xl mb-14 uppercase tracking-widest">Galeri</h2>

      {/* Satu kolom vertikal, foto berselang-seling kiri/kanan seperti editorial */}
      <div className="w-full max-w-sm flex flex-col gap-14">
        {gradients.map((grad, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 ${i % 2 === 1 ? "flex-row-reverse text-right" : ""}`}
          >
            <div className={`w-32 h-40 shrink-0 bg-gradient-to-br ${grad} border border-[#c9a06e]/30`} />
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8794a] mb-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-heading text-lg">{captions[i]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;
