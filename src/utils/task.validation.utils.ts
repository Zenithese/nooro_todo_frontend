import { z } from "zod";
import { colorHexValues } from "@/types/task.type";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.enum(colorHexValues),
  completed: z.boolean().default(false),
});

export type TaskData = z.infer<typeof taskSchema>;

export async function validateFormData(formData: FormData): Promise<TaskData> {
  const rawData = {
    title: formData.get("title") as string,
    color: formData.get("color") as typeof colorHexValues[number],
    completed: formData.get("completed") === "on",
  };

  const result = taskSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error("Validation failed: " + result.error.message);
  }

  return result.data;
}

