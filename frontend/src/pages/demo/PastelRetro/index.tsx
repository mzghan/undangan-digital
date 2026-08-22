// frontend/src/pages/demo/PastelRetro/index.tsx
import "./style.css";
import { useState } from "react";
import Cover from "./sections/Cover";
import Mempelai from "./sections/Mempelai";
import AcaraLokasi from "./sections/AcaraLokasi";
import Galeri from "./sections/Galeri";
import RSVP from "./sections/RSVP";
import UcapanDoa from "./sections/UcapanDoa";
import AmplopDigital from "./sections/AmplopDigital";
import Penutup from "./sections/Penutup";
import FloatingNav from "./components/FloatingNav";
import MusicPlayer from "./components/MusicPlayer";

function PastelRetroDemo() {
  const [dibuka, setDibuka] = useState(false);

  return (
    <div className="tema-pastel-retro">
      {!dibuka && <Cover onBuka={() => setDibuka(true)} />}
      {dibuka && (
        <div className="min-h-screen">
          <div className="max-w-2xl mx-auto">
            <Mempelai />
            <AcaraLokasi />
            <Galeri />
            <RSVP />
            <UcapanDoa />
            <AmplopDigital />
            <Penutup />
          </div>
          <FloatingNav />
          <MusicPlayer aktif={dibuka} />
        </div>
      )}
    </div>
  );
}

export default PastelRetroDemo;
