import { useAudioContext } from "../../context/AudioContext";
const slides = [
  {
    title: "Introduction ",
    content:
      "In this section, you will learn about right-angled triangles, their properties, and how to apply the Pythagoras Theorem to solve problems. A right-angled triangle has one angle equal to 90°, and the relationship between its sides is crucial for many geometric calculations.",
    audioUrl: "./audio/introAudio.mp3",
  },
  {
    title: "Pythagoras Theorem",
    content:
      "Pythagoras Theorem: In a right-angled triangle,the square of the hypotenuse is equal to the sum of the squares of the other two sides",
    formula: "In mathematical terms: a² + b² = c² ",
    audioUrl: "./audio/Audio2.mp3",
  },
  {
    title: "Understanding the Triangle's Sides",
    content:
      "Hover over each side of the triangle to learn more about the relationship between the sides of a right-angled triangle.",
    formula:
      "Where: c is the hypotenuse, a is the perpendicular, and b is the base",
    audioUrl: "./audio/Audio3.mp3",
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
                  if (index === 0) {
                    setIsIntroTab(false);
                  }
                }} // Set the current slide when clicked
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
