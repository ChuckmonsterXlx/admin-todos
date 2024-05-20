import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const objsPage = 2;

  const take = Number(searchParams.get("take") ?? objsPage);
  let skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        error: "'take' has to be a number",
      },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        error: "'skip' has to be a number",
      },
      { status: 400 }
    );
  }

  skip = skip > 0 ? (skip - 1) * objsPage : skip * objsPage;

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});
export async function POST(req: Request) {
  try {
    const { complete, description, ...fieldsNotAllowedObj } =
      await postSchema.validate(await req.json());

    const fieldsNotAllowed = Object.keys(fieldsNotAllowedObj);

    if (fieldsNotAllowed.length) {
      return NextResponse.json({
        error: `The following fields are not allowed: ${fieldsNotAllowed.join(
          ", "
        )}`,
      });
    }

    const todo = await prisma.todo.create({ data: { complete, description } });

    return NextResponse.json(todo);
  } catch (error) {
    const err = error as Error;

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
