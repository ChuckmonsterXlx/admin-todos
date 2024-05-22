import prisma from "@/lib/prisma";
import { CreateTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rest TODOS",
  description: "List of TODOS",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <CreateTodo />

      <TodosGrid todos={todos} />
    </div>
  );
}
