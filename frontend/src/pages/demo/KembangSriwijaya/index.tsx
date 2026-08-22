// frontend/src/pages/demo/KembangSriwijaya/index.tsx
import "./style.css";
import { useState, type CSSProperties } from "react";
import Cover from "./sections/Cover";
import Mempelai from "./sections/Mempelai";
import AcaraLokasi from "./sections/AcaraLokasi";
import Galeri from "./sections/Galeri";
import RSVP from "./sections/RSVP";
import UcapanDoa from "./sections/UcapanDoa";
import AmplopDigital from "./sections/AmplopDigital";
import Penutup from "./sections/Penutup";
import MusicPlayer from "./components/MusicPlayer";

const batikPatternStyle: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.8' opacity='0.35'%3E%3Ccircle cx='20' cy='20' r='14'/%3E%3Ccircle cx='60' cy='20' r='14'/%3E%3Ccircle cx='20' cy='60' r='14'/%3E%3Ccircle cx='60' cy='60' r='14'/%3E%3Ccircle cx='40' cy='40' r='14'/%3E%3C/g%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "80px 80px",
};

function KembangSriwijayaDemo() {
  const [dibuka, setDibuka] = useState(false);

  return (
    <div className="tema-kembang-sriwijaya">
      {!dibuka && <Cover onBuka={() => setDibuka(true)} />}
      <MusicPlayer aktif={dibuka} />
      {dibuka && (
        <div
          className="min-h-screen bg-[#2b1b12] text-[#f5e9d6]"
          style={batikPatternStyle}
        >
          <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
            <Mempelai />
            <AcaraLokasi />
            <Galeri />
            <RSVP />
            <UcapanDoa />
            <AmplopDigital />
            <Penutup />
          </div>
        </div>
      )}
    </div>
  );
}

export default KembangSriwijayaDemo;
