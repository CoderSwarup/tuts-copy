interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const Slider = ({ value, onChange }: SliderProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ladder Base Distance: {value.toFixed(1)}m
      </label>
      <input
        type="range"
        min={0.5}
        max={4}
        step={0.1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};
