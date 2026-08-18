// frontend/src/pages/demo/KembangSriwijaya/components/SongketMotif.tsx
type Posisi = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const posisiClass: Record<Posisi, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0 -scale-x-100",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 rotate-180",
};

function SongketMotif({
  posisi,
  warna = "#d4af37",
  className = "",
}: {
  posisi: Posisi;
  warna?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 opacity-[0.15] pointer-events-none select-none ${posisiClass[posisi]} ${className}`}
      fill="none"
      stroke={warna}
      strokeWidth="1.2"
    >
      {/* Pola belah ketupat bertumpuk, terinspirasi motif geometris songket */}
      <path d="M0 40 L40 0 M0 80 L80 0 M0 120 L120 0 M0 160 L160 0" />
      <circle cx="20" cy="20" r="3" fill={warna} stroke="none" />
      <circle cx="50" cy="50" r="3" fill={warna} stroke="none" />
      <circle cx="80" cy="80" r="3" fill={warna} stroke="none" />
      <rect x="10" y="10" width="16" height="16" transform="rotate(45 18 18)" />
    </svg>
  );
}

export default SongketMotif;
