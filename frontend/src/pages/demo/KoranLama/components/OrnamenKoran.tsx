// frontend/src/pages/demo/KoranLama/components/OrnamenKoran.tsx
type Posisi = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const posisiClass: Record<Posisi, string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3 -scale-x-100",
  "bottom-left": "bottom-3 left-3 -scale-y-100",
  "bottom-right": "bottom-3 right-3 rotate-180",
};

function OrnamenKoran({
  posisi,
  warna = "#2b2620",
  className = "",
}: {
  posisi: Posisi;
  warna?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 opacity-60 pointer-events-none select-none ${posisiClass[posisi]} ${className}`}
      fill="none"
      stroke={warna}
      strokeWidth="1.5"
    >
      {/* Ornamen sudut ala vinyet surat kabar lawas */}
      <path d="M6 6 H40 M6 6 V40" strokeLinecap="round" />
      <path d="M6 6 Q30 10 34 34" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2.4" fill={warna} stroke="none" />
    </svg>
  );
}

export default OrnamenKoran;
