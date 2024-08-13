export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { CreateTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUserSessionServer } from "@/auth";

export const metadata: Metadata = {
  title: "Server TODOS",
  description: "List of server TODOS",
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  if (!user) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <p className="text-3xl mb-4">Server Actions</p>
      <CreateTodo />

      <TodosGrid todos={todos} />
    </>
  );
}
