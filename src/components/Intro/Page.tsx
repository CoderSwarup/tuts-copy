import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudioContext } from "../../context/AudioContext";

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hoveredSide, setHoveredSide] = useState("");

  const [isHovered, setisHovered] = useState(false);

  const { selectedAudio } = useAudioContext();

  const slides = [
    // {
    //   title: "Introduction ",
    //   content:
    //     "In this section, you will learn about right-angled triangles, their properties, and how to apply the Pythagoras Theorem to solve problems. A right-angled triangle has one angle equal to 90°, and the relationship between its sides is crucial for many geometric calculations.",
    //   audioUrl: "./audio/introAudio.mp3",
    // },
    {
      title: "Pythagoras Theorem",
      content:
        "Pythagoras Theorem: In a right-angled triangle,the square of the hypotenuse is equal to the sum of the squares of the other two sides",
      formula: "In mathematical terms: a² + b² = c² ",
      audioUrl: `./audio/${selectedAudio}/3_PythaDef.mp3`,
    },
    {
      title: "Understanding the Triangle's Sides",
      content:
        "Hover over each side of the triangle to learn more about the relationship between the sides of a right-angled triangle.",
      formula:
        "Where: c is the hypotenuse, a is the perpendicular, and b is the base",
      audioUrl: `./audio/${selectedAudio}/4_Hover_Side.mp3`,
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

  const startPlaying = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
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
  useEffect(() => {
    startPlaying();
  }, [currentSlide]);

  useEffect(() => {
    if (currentTime >= duration) {
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [currentTime, duration, currentSlide]);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const SetHoverTrue = () => {
    if (currentSlide === 1) {
      setisHovered(true);
    }
  };
  return (
    <div className="min-h-screen overflow-hidden bg-gray-900 flex flex-col lg:flex-row">
      {/* Main Content - Left Side */}
      <div className=" flex-1 lg:p-2 overflow-hidden">
        <div className="relative bg-gray-800 lg:rounded-3xl p-12 shadow-2xl h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-700" />

          <h1 className="text-white text-center text-wrap text-xl md:text-4xl font-bold tracking-tight mb-16 relative z-10 animate-fade-in">
            {slides[currentSlide].title}
          </h1>

          <div className="relative w-full h-96 transform hover:scale-102 transition-transform duration-500">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 460 470"
              className="transform transition-all fixed"
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

              {/* Hoverable Areas for Sides */}
              <path
                d="M30 430 L430 430"
                fill="none"
                stroke="transparent"
                strokeWidth="30"
                onMouseEnter={() => {
                  setHoveredSide("b"), SetHoverTrue();
                }}
                onMouseLeave={() => setHoveredSide("")}
              />
              <path
                d="M430 430 L430 30"
                fill="none"
                stroke="transparent"
                strokeWidth="30"
                onMouseEnter={() => {
                  setHoveredSide("a"), SetHoverTrue();
                }}
                onMouseLeave={() => setHoveredSide("")}
              />
              <path
                d="M30 430 L430 30"
                fill="none"
                stroke="transparent"
                strokeWidth="30"
                onMouseEnter={() => {
                  setHoveredSide("c"), SetHoverTrue();
                }}
                onMouseLeave={() => setHoveredSide("")}
              />

              {/* Right Angle Marker */}
              <path
                d="M380 430 L380 380 L430 380"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3"
                className="animate-draw"
              />

              {/* Labels with Hover Interaction */}
              {currentSlide >= 0 && (
                <>
                  <text
                    x="50%"
                    y="98%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="2rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                    onMouseEnter={() => setHoveredSide("b")}
                    onMouseLeave={() => setHoveredSide("")}
                  >
                    {currentSlide >= 1 && hoveredSide === "b"
                      ? "b = √(c² - a²)"
                      : "b"}
                  </text>
                  <text
                    x="90%"
                    y="50%"
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="2rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                    onMouseEnter={() => setHoveredSide("a")}
                    onMouseLeave={() => setHoveredSide("")}
                  >
                    {currentSlide >= 1 && hoveredSide === "a"
                      ? "a = √(c²-b²)"
                      : "a"}
                  </text>
                  <text
                    x={
                      (currentSlide === 1 && hoveredSide === "c") ||
                      currentSlide === 0
                        ? "30%"
                        : "45%"
                    }
                    y="45%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="2rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                    onMouseEnter={() => setHoveredSide("c")}
                    onMouseLeave={() => setHoveredSide("")}
                  >
                    {currentSlide >= 1 && hoveredSide === "c"
                      ? "c = √(a² + b²)"
                      : ""}
                    {currentSlide == 1 && hoveredSide !== "c" && "c"}
                    {currentSlide == 0 && "c = √(a² + b²)"}
                  </text>
                </>
              )}

              {/* Right Angle Box */}

              {/* Audio Playing Animation */}
              {currentSlide === 0 && isPlaying && (
                <>
                  {/* First Line */}
                  <line
                    key={0}
                    x1={30}
                    y1={430}
                    x2={430}
                    y2={430}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10 5"
                    strokeDashoffset="100%"
                    className="animate-line" // This will animate from right to left
                  />

                  {/* Second Line */}
                  <line
                    key={1}
                    x1={430}
                    y1={430}
                    x2={430}
                    y2={30}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10 5"
                    strokeDashoffset="100%"
                    className="animate-line" // This will animate from bottom to top
                  />

                  {/* Third Line */}
                  <line
                    key={2}
                    x1={30}
                    y1={430}
                    x2={430}
                    y2={30}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10 5"
                    strokeDashoffset="100%"
                    className="animate-line-reverse" // This will animate from bottom-left to top-right
                  />
                </>
              )}

              {/* Hover Effects for Sides */}
              {currentSlide === 1 && hoveredSide === "b" && (
                <line
                  key={0}
                  x1={30}
                  y1={430}
                  x2={430}
                  y2={430}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                  className="animate-blink"
                />
              )}

              {currentSlide === 1 && hoveredSide === "a" && (
                <line
                  key={1}
                  x1={430}
                  y1={430}
                  x2={430}
                  y2={30}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                  className="animate-blink"
                />
              )}

              {currentSlide === 1 && hoveredSide === "c" && (
                <line
                  key={2}
                  x1={30}
                  y1={430}
                  x2={430}
                  y2={30}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                  className="animate-blink"
                />
              )}

              {/* Arrow Animation */}
              {currentSlide === 1 && !isHovered && (
                <>
                  {/* Reversed Arrow for side a (bottom edge) */}
                  <g
                    className="animate-arrow-b"
                    style={{ transformOrigin: "center" }}
                  >
                    <polygon points="230,430 220,440 240,440" fill="white" />
                  </g>

                  {/* Reversed Arrow for side b (right edge) */}
                  <g
                    className="animate-arrow-a"
                    style={{ transformOrigin: "center" }}
                  >
                    <polygon points="420,230 430,240 430,220" fill="white" />
                  </g>

                  {/* Reversed Arrow for side c (hypotenuse) */}
                  <g
                    className="animate-arrow-c"
                    style={{ transformOrigin: "center" }}
                  >
                    <polygon points="240,230 230,240 230,220" fill="white" />
                  </g>
                </>
              )}

              {currentSlide === 0 && (
                <>
                  <text
                    x="65%" // X-position for the label (adjust as needed)
                    y="65%" // Y-position for the label (adjust as needed)
                    transform="rotate(90 80% 50%)" // Rotate the text 90 degrees centered at (80%, 50%)
                    textAnchor="middle" // Center the text horizontally
                    dominantBaseline="middle" // Center the text vertically
                    fontSize="1.5rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                  >
                    <tspan x="75%" dy="-1.2em">
                      Perpendicular
                    </tspan>{" "}
                  </text>

                  {/* Label for Side a (Left side of the triangle) */}
                  <text
                    x="25%" // Position for the side 'a' label
                    y="55%" // Position for the side 'a' label
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="1.5rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                  >
                    Hypotenuse
                  </text>

                  {/* Label for Side b (Base side at the bottom) */}
                  <text
                    x="65%" // Position for the side 'b' label
                    y="98%" // Position for the side 'b' label (at the bottom)
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="1.5rem"
                    fill="white"
                    className="animate-fade-in cursor-pointer"
                  >
                    Base
                  </text>
                </>
              )}

              {/* 90° Label */}
              <text
                x="400"
                y="415"
                textAnchor="start"
                dominantBaseline="middle"
                fontSize="16"
                fill="white"
              >
                90°
              </text>
            </svg>
          </div>

          {currentSlide === 1 && (
            <div className="absolute bottom-1 right-3 bg-gray-900 text-gray-400 p-4 rounded-lg">
              <p className="text-sm">Sum of angles equals 180&deg;</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className=" w-full lg:w-96 bg-gray-800 p-3 flex flex-col gap-6">
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
        {slides[currentSlide].formula && (
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

      {currentSlide === 1 &&
        (() => {
          switch (hoveredSide) {
            case "a":
              return (
                <audio
                  src={`./audio/${selectedAudio}/6_LabelSide_A.mp3`}
                  className="hidden"
                  autoPlay
                />
              );
            case "b":
              return (
                <audio
                  src={`./audio/${selectedAudio}/7_LabelSide_B.mp3`}
                  className="hidden"
                  autoPlay
                />
              );
            case "c":
              return (
                <audio
                  src={`./audio/${selectedAudio}/8_LabelSide_C.mp3`}
                  className="hidden"
                  autoPlay
                />
              );
          }
        })()}
    </div>
  );
}
