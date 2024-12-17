"use client";

import { Dispatch, SetStateAction } from "react";
import { toggleTaskComplete } from "@/actions/task.actions";
import { Task } from "@/types/task.type";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ToggleCompleteProps {
  task: Task;
  completed: boolean;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}

export function ToggleComplete({ task, completed, setCompleted }: ToggleCompleteProps) {
  const router = useRouter();

  const handleToggle = async () => {
    try {
      const updatedTask = await toggleTaskComplete({ ...task, completed: !completed });
      setCompleted(updatedTask.completed);
    } catch (error) {
      console.error("Failed to toggle task complete:", error);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/tasks/update/${task.id}`);
  };

  return (
    <button className="flex items-center space-x-2 h-full ml-4" onClick={handleToggle}>
      {completed ? (
        <Image
        src="/check.svg"
        alt="check"
        width="0"
        height="0"
        style={{ width: "24px", height: "24px" }}
        className="cursor-pointer"
      />
    ) : (
      <div
        onChange={handleToggle}
        className={`w-[18px] h-[18px] mr-[6px] relative left-[2px] rounded-full border border-[#4EA8DE] cursor-pointer ${task.completed && 'bg-[#4EA8DE] border-[#4EA8DE]'}`}
      />
    )}
      <span className={`text-wt cursor-pointer max-w-[650px] ${task.completed && 'line-through'}`} onClick={handleEditClick}>{task.title}</span>
    </button>
  );
}