"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import * as todosApi from "@/todos/helpers/todos";
import { deleteCompletedTodos } from "../actions/todo-actions";

export const CreateTodo = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) {
      return;
    }

    const body = {
      description: description.trim(),
    };

    await todosApi.createTodo(description);

    router.refresh();

    setDescription("");

    return;
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full mb-5">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 py-2 pl-3 pr-3 transition-all border-2 border-gray-200 rounded-lg outline-none focus:border-sky-500"
        placeholder="What needs to be done?"
      />

      <button
        type="submit"
        className="flex items-center justify-center p-2 ml-2 text-white transition-all rounded bg-sky-500 hover:bg-sky-700"
      >
        Create
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompletedTodos()}
        type="button"
        className="flex items-center justify-center gap-2 p-2 ml-2 text-white transition-all bg-red-400 rounded hover:bg-red-700"
      >
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  );
};
