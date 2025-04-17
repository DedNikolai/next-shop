import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'You are not authorised' }, { status: 401 });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: +session.user.id
      }
    })
    
    if (!user) {
      return NextResponse.json({ message: 'Failed to fetch user data' });
    }

    return NextResponse.json(user);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(session.user.id),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}