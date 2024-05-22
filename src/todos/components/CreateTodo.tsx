"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from "../helpers/todos";
import { useRouter } from "next/navigation";

export const CreateTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) {
      return;
    }

    const body = {
      description: description.trim(),
    };

    const createdTodo = await todosApi.createTodo(body.description);
    setDescription("");

    router.refresh();

    return createdTodo;
  };

  const onDeleteCompletedTodos = async () => {
    await todosApi.deleteCompletedTodos();

    router.refresh();

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
        onClick={() => onDeleteCompletedTodos()}
        type="button"
        className="flex items-center justify-center gap-2 p-2 ml-2 text-white transition-all bg-red-400 rounded hover:bg-red-700"
      >
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  );
};
