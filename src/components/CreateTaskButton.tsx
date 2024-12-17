"use client";

import { useRouter } from "next/navigation";

export default function CreateTaskButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/tasks/create")} className="w-full bg-button-blue rounded-lg text-wt p-4 gap-2 relative bottom-[32px]">Create Task <span className="text-2xl relative top-[1px]">&#8853;</span></button>
  );
}
