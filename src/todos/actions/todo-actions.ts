"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodoStatus = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  if (!todo) {
    throw `Todo width id '${id}' not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete: complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const createTodo = async (description: string, userId: string) => {
  try {
    const todo = await prisma.todo.create({
      data: { description, userId: userId },
    });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      error: "Error creating Todo",
    };
  }
};

export const deleteCompletedTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    revalidatePath("/dashboard/server-todos");

    return;
  } catch (error) {
    const err = error as Error;

    return console.error(err.message);
  }
};
