// frontend/src/pages/demo/SenjaAesthetic/components/BlobDecor.tsx
type Posisi = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const posisiClass: Record<Posisi, string> = {
  "top-left": "-top-16 -left-16",
  "top-right": "-top-16 -right-16",
  "bottom-left": "-bottom-16 -left-16",
  "bottom-right": "-bottom-16 -right-16",
};

function BlobDecor({
  posisi,
  warna = "#c17b5f",
  className = "",
}: {
  posisi: Posisi;
  warna?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20 pointer-events-none select-none ${posisiClass[posisi]} ${className}`}
      style={{ backgroundColor: warna }}
    />
  );
}

export default BlobDecor;
