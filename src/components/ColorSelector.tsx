"use client";

import { useState } from "react";
import { colorHexValues } from "@/types/task.type";

interface ColorSelectorProps {
  initialColor?: string;
}

export function ColorSelector({ initialColor = "" }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-h2-blue">Color</label>
      <div className="flex space-x-4">
        {colorHexValues.filter(color => color !== "").map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`h-10 w-10 rounded-full focus:outline-none ${selectedColor === color && "ring-2 ring-blue-500"}`}
            style={{ backgroundColor: color }}
            aria-label={color}
          />
        ))}
      </div>
      <input type="hidden" id="color" name="color" value={selectedColor} />
    </div>
  );
}