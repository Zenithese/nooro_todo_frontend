import { TaskForm } from "@/components/TaskForm";
import { getAllTasks, updateTask } from "@/actions/task.actions";
import { Task } from "@/types/task.type";

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tasks = await getAllTasks();
  const task = tasks.find((t: Task) => t.id === parseInt(id));

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <TaskForm action={updateTask} initialData={task} />
    </div>
  );
}