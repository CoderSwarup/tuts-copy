import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    audioRef.current?.play();
  }, []);

  useEffect(() => {
    if (currentTime > 0.2 && currentTime >= duration) {
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [currentTime, duration]);

  return (
    <div className="bg-gray-700/50 rounded-xl p-3 shadow-lg">
      <h3 className="text-indigo-400 font-semibold mb-4">Audio Narration</h3>
      <audio ref={audioRef} src={audioUrl} className="hidden" />
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
  );
};

export default AudioPlayer;
