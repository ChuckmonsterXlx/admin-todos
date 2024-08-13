import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@test.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "user", "super-user"],
      name: "test1",
      todos: {
        create: [
          {
            description: "Soul stone",
            complete: true,
          },
          { description: "Power stone" },
          { description: "Time stone" },
          { description: "Space stone" },
          { description: "Reality stone" },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     {
  //       description: "Soul stone",
  //       complete: true,
  //     },
  //     { description: "Power stone" },
  //     { description: "Time stone" },
  //     { description: "Space stone" },
  //     { description: "Reality stone" },
  //   ],
  // });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
