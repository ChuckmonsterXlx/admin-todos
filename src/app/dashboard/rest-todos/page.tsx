export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";
import { CreateTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Rest TODOS",
  description: "List of TODOS",
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
    <div>
      <CreateTodo />

      <TodosGrid todos={todos} />
    </div>
  );
}
