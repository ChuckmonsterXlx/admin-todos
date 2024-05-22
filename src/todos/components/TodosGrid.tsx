"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import * as todosApi from "../helpers/todos";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  const updateTodoStatus = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodoStatus(id, complete);

    router.refresh();

    return updatedTodo;
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodoStatus={() => updateTodoStatus(todo.id, !todo.complete)}
        />
      ))}
    </div>
  );
};
