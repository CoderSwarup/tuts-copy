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
  const [selectedAudio] = useState("English"); // No need for setSelectedAudio anymore

  return (
    <AudioContext.Provider
      value={{ selectedAudio, setSelectedAudio: () => {} }}
    >
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
  const { selectedAudio } = useAudioContext();

  return (
    <div className="fixed bottom-[2%] left-4 z-[999] bg-gray-900 text-gray-200 p-2 rounded-lg shadow-lg border border-gray-700 flex flex-col gap-2">
      <span className="text-sm font-medium">Audio: {selectedAudio}</span>
    </div>
  );
};
