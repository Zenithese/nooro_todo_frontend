'use client';

import { Task } from "@/types/task.type";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { ToggleComplete } from "./ToggleComplete";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [completed, setCompleted] = useState(task.completed);
  return (
    <div className={`task-card bg-card flex justify-between rounded-lg min-h-[72px]`}>
      <div>
        <ToggleComplete task={task} completed={completed} setCompleted={setCompleted} />
      </div>
      <div>
        <DeleteTaskButton id={task.id} todo={task.title} />
      </div>
    </div>
  );
}