import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Beranda from "./pages/Beranda";
import UndanganDigital from "./pages/UndanganDigital";
import Portofolio from "./pages/Portofolio";
import Testimoni from "./pages/Testimoni";
import WeddingPlanner from "./pages/WeddingPlanner";
import AksaraHashtag from "./pages/AksaraHashtag";
import KembangSriwijayaDemo from "./pages/demo/KembangSriwijaya";
import WeddingPlannerTrial from "./pages/WeddingPlannerTrial";

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
          <Route
            path="/wedding-planner/trial"
            element={<WeddingPlannerTrial />}
          />
        </Route>
        <Route
          path="/undangan-digital/demo/kembang-sriwijaya"
          element={<KembangSriwijayaDemo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
