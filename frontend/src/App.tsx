import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import UndanganDigital from './pages/UndanganDigital';
import Portofolio from './pages/Portofolio';
import Testimoni from './pages/Testimoni';
import WeddingPlanner from './pages/WeddingPlanner';
import AksaraHashtag from './pages/AksaraHashtag';
import KembangSriwijayaDemo from './pages/demo/KembangSriwijaya';
import SenjaAestheticDemo from './pages/demo/SenjaAesthetic';
import PuspaBaliDemo from './pages/demo/PuspaBali';
import FloralBlancDemo from './pages/demo/FloralBlanc';
import BohoSavanaDemo from './pages/demo/BohoSavana';
import DarkLuxuryNoirDemo from './pages/demo/DarkLuxuryNoir';
import PastelRetroDemo from './pages/demo/PastelRetro';
import KoranLamaDemo from './pages/demo/KoranLama';
import NetflixDemo from './pages/demo/Netflix';
import WeddingPlannerTrial from './pages/WeddingPlannerTrial';
import WeddingPlannerTrialPremium from './pages/WeddingPlannerTrialPremium';
import WeddingPlannerTrialVendorTracker from './pages/WeddingPlannerTrialVendorTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/undangan-digital" element={<UndanganDigital />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/wedding-planner" element={<WeddingPlanner />} />
          <Route path="/aksara-hashtag" element={<AksaraHashtag />} />
          <Route path="/wedding-planner/trial" element={<WeddingPlannerTrial />} />
          <Route path="/wedding-planner/trial-premium" element={<WeddingPlannerTrialPremium />} />
          <Route path="/wedding-planner/trial-vendor-tracker" element={<WeddingPlannerTrialVendorTracker />} />
        </Route>
        <Route path="/undangan-digital/demo/kembang-sriwijaya" element={<KembangSriwijayaDemo />} />
        <Route path="/undangan-digital/demo/senja-aesthetic" element={<SenjaAestheticDemo />} />
        <Route path="/undangan-digital/demo/puspa-bali" element={<PuspaBaliDemo />} />
        <Route path="/undangan-digital/demo/floral-blanc" element={<FloralBlancDemo />} />
        <Route path="/undangan-digital/demo/boho-savana" element={<BohoSavanaDemo />} />
        <Route path="/undangan-digital/demo/dark-luxury-noir" element={<DarkLuxuryNoirDemo />} />
        <Route path="/undangan-digital/demo/pastel-retro" element={<PastelRetroDemo />} />
        <Route path="/undangan-digital/demo/koran" element={<KoranLamaDemo />} />
        <Route path="/undangan-digital/demo/netflix" element={<NetflixDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
