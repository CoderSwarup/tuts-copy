import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ActivityTab from "./pages/ActivityTab";
import IntroductionPage from "./pages/IntroductionPage";
import PythagorasExercise from "./pages/PythagorusExercise";
import LadderPage from "./pages/LadderPage";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<IntroductionPage />} />
          {/* <Route path="/introduction" element={} /> */}
          <Route path="/pythagorusexercise" element={<PythagorasExercise />} />
          <Route path="/activity" element={<ActivityTab />} />
          <Route path="/ladder" element={<LadderPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
