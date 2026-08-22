// frontend/src/pages/demo/Netflix/components/PlayMotif.tsx
type Posisi = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const posisiClass: Record<Posisi, string> = {
  "top-left": "-top-14 -left-14",
  "top-right": "-top-14 -right-14",
  "bottom-left": "-bottom-14 -left-14",
  "bottom-right": "-bottom-14 -right-14",
};

function PlayMotif({
  posisi,
  className = "",
}: {
  posisi: Posisi;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={`absolute w-40 h-40 sm:w-52 sm:h-52 opacity-[0.06] pointer-events-none select-none ${posisiClass[posisi]} ${className}`}
      fill="none"
    >
      {/* Bilah ala logo streaming, disusun miring */}
      <rect x="30" y="10" width="26" height="180" fill="#E50914" transform="skewX(-8)" />
      <rect x="90" y="10" width="26" height="180" fill="#E50914" transform="skewX(-8)" opacity="0.7" />
      <rect x="150" y="10" width="26" height="180" fill="#E50914" transform="skewX(-8)" opacity="0.45" />
    </svg>
  );
}

export default PlayMotif;
