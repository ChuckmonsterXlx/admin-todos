import { NextResponse } from "next/server";
import * as yup from "yup";

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";

interface ISegments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string) => {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (todo?.userId !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(req: Request, { params }: ISegments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      {
        error: "Todo was not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});
export async function PUT(req: Request, { params }: ISegments) {
  try {
    const { id } = params;

    let todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json(
        {
          error: "Todo was not found",
        },
        { status: 404 }
      );
    }

    const { complete, description, ...fieldsNotAllowedObj } =
      await putSchema.validate(await req.json());

    const fieldsNotAllowed = Object.keys(fieldsNotAllowedObj);

    if (fieldsNotAllowed.length) {
      return NextResponse.json({
        error: `The following fields are not allowed: ${fieldsNotAllowed.join(
          ", "
        )}`,
      });
    }

    todo = await prisma.todo.update({
      where: { id: id },
      data: { complete: complete, description: description },
    });

    return NextResponse.json(todo);
  } catch (error) {
    const err = error as Error;

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
