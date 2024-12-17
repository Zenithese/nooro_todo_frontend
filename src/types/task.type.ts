export enum Color {
  RED = "#FF3B30",
  ORANGE = "#FF9500",
  YELLOW = "#FFCC00",
  GREEN = "#34C759",
  BLUE = "#007AFF",
  INDIGO = "#5856D6",
  PURPLE = "#AF52DE",
  PINK = "#FF2D55",
  BROWN = "#A2845E",
}

export const colorHexValues = ["", ...Object.values(Color)] as const;

export interface Task {
  id: number;
  title: string;
  color?: Color;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
