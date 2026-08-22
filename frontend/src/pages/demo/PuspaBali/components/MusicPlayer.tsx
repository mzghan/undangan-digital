// frontend/src/pages/demo/PuspaBali/components/MusicPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { musik, judulMusik } from "../data";

function MusicPlayer({ aktif }: { aktif: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!aktif || !audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0.45;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // browser blokir autoplay — tinggal tap tombolnya
  }, [aktif]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!aktif) return null;

  return (
    <>
      <audio ref={audioRef} src={musik} loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? `Jeda ${judulMusik}` : `Putar ${judulMusik}`}
        title={playing ? "Jeda musik" : "Putar musik"}
        className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 w-11 h-11 rounded-full border-2 bg-[#5c1f1f]/70 border-[#c9a24b] backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 text-[#c9a24b] ${playing ? "animate-[spin_4s_linear_infinite]" : ""}`}
          fill="none"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2.6" fill="currentColor" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}

export default MusicPlayer;
