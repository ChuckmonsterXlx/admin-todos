export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { CreateTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server TODOS",
  description: "List of server TODOS",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <p className="text-3xl mb-4">Server Actions</p>
      <CreateTodo />

      <TodosGrid todos={todos} />
    </>
  );
}
