import { Info, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LadderScene from "../components/LadderTab/LadderScene";
import { OrbitControls } from "@react-three/drei";
export default function LadderPage() {
  const [sliderValue, setSliderValue] = useState(2);
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = () => {
    if (sliderValue === 3) {
      correctAudioRef.current?.play();
      setSubmit(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Not quite right. Remember, the square of the hypotenuse equals the sum of the squares of the other two sides!"
      );
      wrongAudioRef.current?.play();
    }
  };

  if (submit) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Excellent Work!</h2>
          <p className="text-xl text-gray-300">
            The base of the ladder should indeed be kept 3 metres away from the
            wall for optimal safety and stability.
          </p>
          <div className="pt-6 space-x-4">
            <button
              onClick={() => {
                setSubmit(false);
                setSliderValue(2);
              }}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
        <audio
          ref={correctAudioRef}
          src="./audio/correct.mp3"
          autoPlay
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Content - Left Side */}
      <div className="flex-1 p-2 max-h-screen ">
        <div className="bg-gray-800 rounded-2xl p-2 shadow-2xl h-full relative overflow-hidden ">
          <h1 className="text-white text-center text-4xl font-bold tracking-tight mb-12 relative z-10">
            Ladder Safety Problem
          </h1>

          <Canvas camera={{ position: [70, 20, -50], fov: 20 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={5} />
            <OrbitControls
              maxAzimuthAngle={-Math.PI / 1.7}
              minAzimuthAngle={Math.PI / 1.7}
              maxPolarAngle={Math.PI / 2.4}
              minPolarAngle={Math.PI / 6}
            />
            <LadderScene baseDistance={sliderValue} wallHeight={4} />
          </Canvas>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-[400px] bg-gray-800 p-6 flex flex-col max-h-screen overflow-y-scroll">
        <h2 className="text-2xl font-bold text-white mb-4">Problem</h2>
        {/* Problem Statement */}
        <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
          <p className="text-gray-300 leading-relaxed">
            A ladder is 5 metres long and needs to reach a height of 4 metres on
            a wall. Using the Pythagorean theorem, determine the safe distance
            to place the base of the ladder from the wall.
          </p>
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="text-blue-400 font-semibold mb-2">Given:</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Ladder length (hypotenuse) = 5m</li>
              <li>• Wall height = 4m</li>
              <li>• Base distance = ? (your answer)</li>
            </ul>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 mb-6 flex items-start gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-auto flex items-start gap-3 text-sm">
          <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-400">
            Drag the slider to adjust the base distance. Use the 3D view to
            visualize the ladder placement.
          </p>
        </div>

        <audio
          ref={wrongAudioRef}
          src="./audio/LadderInCorrect.mp3"
          className="hidden"
        />
        <audio src="./audio/ladderQuestion.mp3" className="hidden" autoPlay />
      </div>
      {/* Interactive Controls */}
      <div className="fixed  bottom-4 left-[40%]  -translate-x-[50%] bg-gray-900 h-[150px] p-3">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-sm font-semibold text-white">
            What Should be the base Distance
          </h2>
          <span className="text-blue-400 font-mono font-bold">
            {sliderValue}m
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={0.1}
          value={sliderValue}
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          className="w-full h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-blue-500
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-110"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-500 transition-all duration-200 font-semibold"
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
