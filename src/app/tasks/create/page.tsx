import { TaskForm } from "@/components/TaskForm";
import { createTask } from "@/actions/task.actions";

export default function CreateTaskPage() {
  return (
    <div>
      <TaskForm action={createTask}/>
    </div>
  );
}