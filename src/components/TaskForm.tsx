"use client";

import { useActionState, useEffect } from "react";
import { createTask, updateTask } from "@/actions/task.actions";
import { TaskData } from "@/utils/task.validation.utils";
import { useRouter } from "next/navigation";
import { ColorSelector } from "./ColorSelector";
import Image from "next/image";

interface TaskFormProps {
  action: typeof createTask | typeof updateTask;
  initialData?: TaskData & { id?: number };
}

const initialState = {
  message: "",
};

export function TaskForm({ action, initialData }: TaskFormProps) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
  // @ts-ignore
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state?.message === "success") {
      router.push("/");
    }
  }, [router, state]);

  return (
    <div className="gap-12 mt-12 my-auto max-w-[736px] w-[70%] flex flex-col justify-self-center">
      <Image
        src="/arrow-left.svg"
        alt="arrow-left"
        width="0"
        height="0"
        style={{ width: "24px", height: "24px" }}
        onClick={() => router.back()}
        className="cursor-pointer"
      />

      <form
        action={formAction}
        className="space-y-4 my-auto w-full flex flex-col gap-12"
      >
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-h2-blue"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title}
            required
            className="text-wt w-full rounded-lg p-4 gap-3 border border-[#333333] bg-card focus:outline-none"
            placeholder="Ex. Brush your teeth"
          />
        </div>

        <div className="space-y-2">
          <ColorSelector initialColor={initialData?.color} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-button-blue rounded-lg text-wt p-4 gap-2"
        >
          {pending ? (
            "Saving..."
          ) : initialData?.id ? (
            <div className="flex justify-center gap-2">
              Save
              <Image
                src="/save-check.svg"
                alt="save-check"
                width="0"
                height="0"
                style={{ width: "16px", height: "16px" }}
                className="cursor-pointer relative top-[5px]"
              />
            </div>
          ) : (
            <div>
              Add Task{" "}
              <span className="text-2xl relative top-[1.5px]">&#8853;</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
