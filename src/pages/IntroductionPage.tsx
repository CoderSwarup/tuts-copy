import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function IntroductionPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const slides = [
    {
      title: "PYTHAGORAS THEOREM",
      content:
        "Welcome to the simulation on Pythagoras Theorem! Click the Introduction tab to learn about the Pythagoras theorem.",
      audioUrl: "./audio/Audio1.mp3",
    },
    {
      title: "PYTHAGORAS THEOREM",
      content:
        "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
      formula: "In mathematical terms: a² + b² = c² ",
      audioUrl: "./audio/Audio2.mp3",
    },
    {
      title: "PYTHAGORAS THEOREM",
      content:
        "Hover over each side to learn more about the relationship between the sides of a right-angled triangle.",
      formula:
        "Where: c is the hypotenuse, a is the perpendicular, and b is the base",
      audioUrl: "./audio/Audio3.mp3",
    },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const seekTime = (offsetX / progressBar.offsetWidth) * duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gray-900 flex ">
      {/* Main Content - Left Side */}
      <div className="flex-1 p-2 overflow-hidden">
        <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-700" />

          <h1 className="text-white text-center text-5xl font-bold tracking-tight mb-16 relative z-10 animate-fade-in">
            {slides[currentSlide].title}
          </h1>

          <div className="relative w-[500px] h-[500px] mx-auto transform hover:scale-105 transition-transform duration-500">
            <svg
              width="460"
              height="460"
              viewBox="0 0 460 460"
              className="transform transition-all duration-700"
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

              {/* Triangle with Glow Effect */}
              <path
                d="M430 430 L30 430 L430 30 Z"
                fill="url(#triangleGradient)"
                stroke="#6366F1"
                strokeWidth="3"
                filter="url(#glow)"
                className="opacity-90"
              />

              {/* Right Angle Marker */}
              <path
                d="M380 430 L380 380 L430 380"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3"
                className="animate-draw"
              />

              {currentSlide >= 1 && (
                <>
                  {/* Animated Labels */}
                  <text
                    x="230"
                    y="450"
                    textAnchor="middle"
                    className="text-xl font-bold fill-white animate-fade-in"
                  >
                    b
                  </text>
                  <text
                    x="445"
                    y="230"
                    textAnchor="start"
                    className="text-xl font-bold fill-white animate-fade-in"
                  >
                    a
                  </text>
                  <text
                    x="230"
                    y="200"
                    textAnchor="middle"
                    className="text-xl font-bold fill-white animate-fade-in"
                  >
                    c
                  </text>
                </>
              )}

              {/* Right Angle Box */}
              <rect
                x="380"
                y="420"
                width="15"
                height="15"
                fill="#6366F1"
                className="origin-center rotate-45"
              />

              {/* 90° Label */}
              <text x="400" y="415" className="text-xl fill-white ">
                90°
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-96 bg-gray-800 p-3 flex flex-col gap-6">
        <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
          <div className="text-white text-xl p-1 font-light mb-6 min-h-[200px] max-h-[200px] overflow-y-scroll d-scrollbar">
            {slides[currentSlide].content}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="hover:bg-indigo-500 bg-indigo-600 p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:scale-100"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <span className="text-white font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() =>
                setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))
              }
              className="hover:bg-indigo-500 bg-indigo-600 p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:scale-100"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Formula Display */}
        {(currentSlide === 1 || currentSlide === 2) && (
          <div className="bg-gray-700 rounded-xl h-[150px] max-h-[150px] p-3 shadow-lg overflow-y-scroll d-scrollbar ">
            <h3 className="text-indigo-400 font-semibold mb-3">Formula</h3>
            <p className="text-white text-lg font-light">
              {slides[currentSlide].formula}
            </p>
          </div>
        )}

        {/* Audio Player */}
        <div className="bg-gray-700 rounded-xl p-3 shadow-lg mt-auto">
          <h3 className="text-indigo-400 font-semibold mb-4">
            Audio Narration
          </h3>
          <audio
            ref={audioRef}
            src={slides[currentSlide].audioUrl}
            className="hidden"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="hover:bg-indigo-500 bg-indigo-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 text-white" />
              ) : (
                <Play className="w-3 h-3 text-white" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="hover:bg-indigo-500 bg-indigo-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-white" />
              ) : (
                <Volume2 className="w-3 h-3 text-white" />
              )}
            </button>
          </div>
          <div
            className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden cursor-pointer my-4"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-400 flex justify-between">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
