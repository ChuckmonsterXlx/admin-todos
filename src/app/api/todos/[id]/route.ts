import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface ISegments {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: ISegments) {
  const { id } = params;

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

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

    let todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

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
