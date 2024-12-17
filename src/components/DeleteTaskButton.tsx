"use client";

import { useActionState } from "react";
import { deleteTask } from "@/actions/task.actions";
import Image from "next/image";

const initialState = {
  message: "",
};

export function DeleteTaskButton({ id, todo }: { id: number; todo: string }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
    // @ts-ignore
  const [state, formAction, pending] = useActionState(deleteTask, initialState);

  return (
    <form action={formAction} className="flex items-center space-x-2 h-full mr-4">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <button type="submit" aria-disabled={pending}>
      <Image
        src="/trash.svg"
        alt="trash"
        width="0"
        height="0"
        style={{ width: "24px", height: "24px" }}
        className="cursor-pointer"
      />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
