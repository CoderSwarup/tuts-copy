import { useState, useRef, useEffect } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { useAudioContext } from "../context/AudioContext";
import AudioPlayer from "../components/AudioPlayer";

interface Question {
  sides: [number | null, number | null, number | null];
  correctAnswer: number;
}

export default function PythagorasExercise() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);
  const introAudio = useRef<HTMLAudioElement>(null);
  const { selectedAudio } = useAudioContext();

  const questions: Question[] = [
    { sides: [6, 8, null], correctAnswer: 10 },
    { sides: [3, null, 5], correctAnswer: 4 },
    { sides: [null, 12, 13], correctAnswer: 5 },
    { sides: [8, 15, null], correctAnswer: 17 },
    { sides: [null, 9, 15], correctAnswer: 12 },
  ];

  const checkAnswer = () => {
    const userAnswer = parseFloat(answer);
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
      setFeedback({
        isCorrect: true,
        message: "Excellent! That's correct! 🎉",
      });

      // introAudio.current?.pause();
      correctAudioRef.current?.play();

      const newCompleted = [...completedQuestions];
      newCompleted[currentQuestionIndex] = true;
      setCompletedQuestions(newCompleted);

      // Check if all questions are completed
      if (newCompleted.filter(Boolean).length === questions.length) {
        setTimeout(() => setShowCongrats(true), 1000);
      } else {
        // Move to next question after delay
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
          setAnswer("");
          setFeedback(null);
        }, 1500);
      }
    } else {
      setFeedback({
        isCorrect: false,
        message: "Not quite right. Try again using the Pythagorean Theorem.",
      });
      // introAudio.current?.pause();
      wrongAudioRef.current?.play();
    }
  };

  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswer("");
    setFeedback(null);
    setCompletedQuestions([]);
    setShowCongrats(false);
  };

  useEffect(() => {
    // introAudio.current?.play();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Main Content - Left Side */}
      <div className="flex-1 lg:p-2 overflow-hidden max-h-screen flex justify-center items-center">
        <div className="bg-gray-800 lg:rounded-3xl p-4 shadow-2xl w-full  h-screen lg:h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-700" />

          <h1 className="text-white text-center mt-5 lg:mt-0 text-lg lg:text-4xl font-bold tracking-tight mb-16 relative z-10">
            Pythagoras Exercise
          </h1>

          {/* Question Progress */}
          <div className="flex justify-center gap-2 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  completedQuestions[index]
                    ? "bg-green-500"
                    : index === currentQuestionIndex
                    ? "bg-indigo-500"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Triangle Visualization */}
          <div className="relative w-full max-w-[500px] h-[500px] mx-auto transform hover:scale-105 transition-transform duration-500">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full transform transition-all duration-700"
            >
              <defs>
                <linearGradient
                  id="triangleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Triangle */}
              <path
                d="M 100 300 L 300 300 L 300 100 Z"
                fill="url(#triangleGradient)"
                stroke="#6366F1"
                strokeWidth="3"
                filter="url(#glow)"
                className="opacity-90"
              />

              {/* Right Angle Marker */}
              <path
                d="M 290 300 L 290 280 L 300 280"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3"
              />

              {/* Measurements */}
              <text
                x="200"
                y="330"
                textAnchor="middle"
                className="text-md fill-white"
              >
                {questions[currentQuestionIndex].sides[0] ?? "?"} units
              </text>
              <text
                x="330"
                y="200"
                textAnchor="middle"
                className="text-md fill-white"
              >
                {questions[currentQuestionIndex].sides[1] ?? "?"} units
              </text>
              <text
                x="180"
                y="180"
                textAnchor="middle"
                className="text-md fill-white"
              >
                {questions[currentQuestionIndex].sides[2] ?? "?"} units
              </text>

              {/* Glow or Blink Effect for Unknown Side */}
              {questions[currentQuestionIndex].sides.map((side, index) => {
                if (side === null) {
                  const [x1, y1, x2, y2] =
                    index === 0 // Unknown side a
                      ? [100, 300, 300, 300]
                      : index === 1 // Unknown side b
                      ? [300, 300, 300, 100]
                      : [300, 100, 100, 300]; // Unknown side c

                  return (
                    <line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="10 5"
                      className="animate-blink"
                    />
                  );
                }
                return null;
              })}

              {/* 90° Label */}
              <text x="275" y="280" className="text-sm fill-white">
                90°
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-full md:w-96 bg-gray-800 p-2 flex flex-col gap-6 overflow-auto">
        {showCongrats ? (
          <div className="bg-gray-700 rounded-xl p-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-gray-300 mb-8">
              You've successfully completed all the exercises!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Restart
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Exercise
            </h1>
            <div className="bg-gray-700 rounded-xl p-2 shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <div className="space-y-4">
                <label className="block text-gray-300 text-sm font-medium">
                  Enter the missing length:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="?"
                    className="w-24 px-4 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
                  />
                  <button
                    onClick={checkAnswer}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    Check Answer
                  </button>
                </div>
              </div>
            </div>

            {feedback && (
              <div
                className={`bg-gray-700 rounded-xl p-2 shadow-lg animate-fade-in ${
                  feedback.isCorrect
                    ? "border-2 border-green-500"
                    : "border-2 border-red-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  {feedback.isCorrect ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                  <p className="text-white">{feedback.message}</p>
                </div>
              </div>
            )}

            <div className="mt-auto">
              <AudioPlayer
                audioUrl={`./audio/${selectedAudio}/9_Practice_Intro.mp3`}
              />
            </div>

            <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-indigo-400 font-semibold mb-3">Remember:</h3>
              <p className="text-gray-300">
                The Pythagorean Theorem states that in a right triangle:
              </p>
              <p className="text-white font-semibold mt-2">a² + b² = c²</p>
              <p className="text-gray-300 mt-2">
                Where c is the hypotenuse (longest side)
              </p>
            </div>
          </>
        )}

        {/* Hidden Audio Elements */}
        <audio
          ref={correctAudioRef}
          src={`./audio/${selectedAudio}/10_PracticeCorrect.mp3`}
          className="hidden"
        />
        <audio
          ref={wrongAudioRef}
          src={`./audio/${selectedAudio}/11_PracticeInCorrect.mp3`}
          className="hidden"
        />
        {/* <audio
          ref={introAudio}
          src={`./audio/${selectedAudio}/9_Practice_Intro.mp3`}
          className="hidden"
        /> */}
      </div>
    </div>
  );
}
