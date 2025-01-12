import React, { createContext, useState, useContext } from "react";

// Create the context
const AudioContext = createContext<{
  selectedAudio: string;
  setSelectedAudio: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

// Provider component
export const AudioContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedAudio, setSelectedAudio] = useState("English");

  return (
    <AudioContext.Provider value={{ selectedAudio, setSelectedAudio }}>
      <AudioSelector />
      {children}
    </AudioContext.Provider>
  );
};

// Custom hook to use the AudioContext
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider"
    );
  }
  return context;
};
const AudioSelector: React.FC = () => {
  const { selectedAudio, setSelectedAudio } = useAudioContext();

  return (
    <div className="fixed bottom-[1%] left-2 z-[999] bg-gray-900 text-gray-200 p-2 rounded-lg shadow-lg border border-gray-700 flex flex-col gap-2">
      <label htmlFor="audio-select" className="mr-4 text-sm font-medium">
        Select Audio:
      </label>
      <select
        id="audio-select"
        value={selectedAudio}
        onChange={(e) => setSelectedAudio(e.target.value)}
        className="bg-gray-800 text-gray-200 text-sm p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="English">English</option>
        <option value="Gujarati">Gujarati</option>
      </select>
    </div>
  );
};
