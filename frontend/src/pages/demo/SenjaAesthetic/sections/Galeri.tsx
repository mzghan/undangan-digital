// frontend/src/pages/demo/SenjaAesthetic/sections/Galeri.tsx

const items = [
  { grad: "from-[#f2c19a] to-[#c17b5f]", h: "h-56" },
  { grad: "from-[#c17b5f] to-[#8a5a45]", h: "h-40" },
  { grad: "from-[#8a5a45] to-[#f2c19a]", h: "h-48" },
  { grad: "from-[#f2c19a] to-[#8a5a45]", h: "h-36" },
  { grad: "from-[#c17b5f] to-[#f2c19a]", h: "h-52" },
  { grad: "from-[#8a5a45] to-[#c17b5f]", h: "h-44" },
];

function Galeri() {
  return (
    <div
      id="galeri"
      className="min-h-screen bg-[#faf5f0] text-[#3d2a22] flex flex-col items-center px-6 py-20"
    >
      <p className="tracking-[0.3em] text-xs uppercase text-[#c17b5f] mb-3">
        Our Moments
      </p>
      <h2 className="font-heading text-3xl mb-14">Galeri</h2>

      {/* Masonry modern — tinggi bervariasi via CSS columns */}
      <div className="w-full max-w-3xl columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {items.map((item, i) => (
          <div
            key={i}
            className={`mb-4 break-inside-avoid rounded-xl ${item.h} bg-gradient-to-br ${item.grad} shadow-md shadow-[#c17b5f]/10`}
          />
        ))}
      </div>
    </div>
  );
}

export default Galeri;
