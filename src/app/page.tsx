import { Task } from "@/types/task.type";
import { getAllTasks } from "@/actions/task.actions";
import TaskCard from "@/components/TaskCard";
import CreateTaskButton from "@/components/CreateTaskButton";
import Image from "next/image";

export default async function TasksHomePage() {
  const tasks = await getAllTasks();

  const todosOrCompletedCount = (
    title: string,
    count: number,
    textColor: string
  ) => (
    <h1 className={textColor}>
      {title}{" "}
      <span className={"bg-slate-500 text-wt px-2 rounded-lg"}>{count}</span>
    </h1>
  );

  const todos = tasks.length ? (
    tasks.map((task: Task) => <TaskCard key={task.id} task={task} />)
  ) : (
    <>
    <Image
      src="/clipboard.svg"
      alt="clipboard"
      width="0"
      height="0"
      style={{ width: "56px", height: "56px" }}
      className="cursor-pointer relative top-[5px] mx-auto my-8"
    />
    <h2 className="text-[#808080] font-bold text-center">{"You don't have any task registered yet."}</h2>
    <h3 className="text-[#808080] text-center">{"Create task and organize your to-do items."}</h3>
    </>
  );

  return (
    <div className="max-w-[736px] w-[70%] flex flex-col justify-self-center gap-8">
      <CreateTaskButton />
      <div className="flex justify-between">
        {todosOrCompletedCount("Todos", tasks.length, "text-h2-blue")}
        {todosOrCompletedCount(
          "Completed",
          tasks.filter((task: Task) => task.completed).length,
          "text-[#8284FA]"
        )}
      </div>
      <div className="flex flex-col gap-4 border-t border-[#333333] rounded-lg">{todos}</div>
    </div>
  );
}