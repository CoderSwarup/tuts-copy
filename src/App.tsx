import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ActivityTab from "./pages/ActivityTab";
import IntroductionPage from "./pages/IntroductionPage";
import PythagorasExercise from "./pages/PythagorusExercise";
import LadderPage from "./pages/LadderPage";
import Sidebar from "./components/Sidebar";
import LadderProblemPage from "./pages/LadderProblemPage";
import { AudioContextProvider } from "./context/AudioContext";
import { useState } from "react";
import IntroTab from "./components/Intro/IntroTab";

export default function App() {
  const [isIntroTab, setIsIntroTab] = useState(true);
  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <AudioContextProvider>
        <BrowserRouter>
          {isIntroTab ? (
            <IntroTab isIntroTab={isIntroTab} setIsIntroTab={setIsIntroTab} />
          ) : (
            <>
              <Sidebar />
              <Routes>
                <Route path="/" element={<IntroductionPage />} />
                {/* <Route path="/introduction" element={} /> */}
                <Route
                  path="/pythagorusexercise"
                  element={<PythagorasExercise />}
                />
                <Route path="/activity" element={<ActivityTab />} />
                {/* <Route path="/ladder" element={<LadderPage />} /> */}
                <Route path="/ladder" element={<LadderProblemPage />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </AudioContextProvider>
    </div>
  );
}
