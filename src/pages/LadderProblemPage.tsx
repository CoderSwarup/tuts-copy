import { Info, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LadderProblemScene } from "../components/TEST/LadderProblemScene";
import { useAudioContext } from "../context/AudioContext";
import AudioPlayer from "../components/AudioPlayer";

export default function LadderProblemPage() {
  const [sliderValue, setSliderValue] = useState(2);
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);
  const { selectedAudio } = useAudioContext();
  const introAudio = useRef<HTMLAudioElement>(null);

  const handleSubmit = () => {
    if (sliderValue === 3) {
      introAudio.current?.pause();
      wrongAudioRef.current?.pause();
      correctAudioRef.current?.play();
      setSubmit(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Not quite right. Remember, the square of the hypotenuse equals the sum of the squares of the other two sides!"
      );
      correctAudioRef.current?.pause();
      introAudio.current?.pause();
      wrongAudioRef.current?.play();
    }
  };

  useEffect(() => {
    introAudio.current?.play();
  }, []);

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
          src={`./audio/${selectedAudio}/14_Ladder_Correct.mp3`}
          autoPlay
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Main Content - Left Side */}
      <div className="relative flex-1 p-2 min-h-[90vh]  lg:min-h-screen bg-gray-800 lg:rounded-2xl shadow-2xl ">
        <div className="  p-2 h-full relative overflow-hidden">
          <h1 className="text-white text-center  mt-5 md:mt-0  text-2xl md:text-4xl font-bold tracking-tight mb-12 relative z-10">
            Ladder Problem
          </h1>

          {/* Adjust canvas size for mobile */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <LadderProblemScene baseDistance={sliderValue} wallHeight={4} />
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 w-[250px] md:w-[300px] p-2 rounded-lg md:p-3">
          <div className="flex justify-between items-center md:mb-1">
            <h2 className="text-[10px] md:text-sm font-semibold text-white">
              What Should be the base Distance
            </h2>
            <span className="text-blue-400 font-mono font-bold text-[10px] md:text-sm">
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
            className="w-full  h-1 md:h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer
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
            className="w-full mt-4 bg-blue-600 text-white py-2 md:px-4   md:py-3 md:px-8 rounded-lg hover:bg-blue-500 transition-all duration-200 font-semibold"
          >
            Check Answer
          </button>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-full lg:w-[400px] bg-gray-800 p-6 flex flex-col gap-3 max-h-screen overflow-y-scroll">
        <h2 className="text-2xl font-bold text-white mb-1">Problem</h2>
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

        <AudioPlayer audioUrl={`./audio/${selectedAudio}/12_Ladder.mp3`} />

        <audio
          ref={wrongAudioRef}
          src={`./audio/${selectedAudio}/13_Ladder_In_Correct.mp3`}
          className="hidden"
        />
        {/* <audio
          ref={introAudio}
          src={`./audio/${selectedAudio}/12_Ladder.mp3`}
          className="hidden"
        /> */}
      </div>
    </div>
  );
}
