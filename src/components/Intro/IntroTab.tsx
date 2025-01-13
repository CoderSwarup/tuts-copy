import { useNavigate } from "react-router-dom";
import { useAudioContext } from "../../context/AudioContext";
const slides = [
  {
    title: "Introduction",
    url: "/",
  },
  {
    title: "Pythagoras Exercise",
    url: "/pythagorusexercise",
  },
  {
    title: "Activity",
    url: "/activity",
  },
  {
    title: "Ladder Problem",
    url: "/ladder",
  },
];

export default function IntroTab({
  isIntroTab,
  setIsIntroTab,
}: {
  isIntroTab: boolean;
  setIsIntroTab: (value: boolean) => void;
}) {
  const { selectedAudio } = useAudioContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center text-white space-y-8 relative overflow-hidden">
        {/* Background Animation */}

        {/* Header Section */}
        <div className="text-3xl font-extrabold text-white animate-fade-in">
          <h1>PYTHAGORAS THEOREM</h1>
        </div>

        {/* Syllabus Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-300">Topics</h2>
          <ul className="text-lg font-light space-y-4">
            {slides.map((slide, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-indigo-400 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setIsIntroTab(false);
                  navigate(slide.url);
                }}
              >
                <div className="flex justify-start items-center space-x-3">
                  <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full"></span>
                  <span>{slide.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Audio hidden component */}
      <audio
        className="hidden"
        src={`./audio/${selectedAudio}/1_Intro.mp3`}
        autoPlay
      />
    </div>
  );
}
