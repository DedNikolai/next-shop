import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { SERVER_API } from "@/app/constants/app";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'You are not authorised' }, { status: 401 });
    }

    const res = await fetch(`${SERVER_API}/user/${session.user.id}`);
    
    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch user data' }, { status: res.status });
    }

    const userData = await res.json(); // ✅ ВАЖЛИВО!
    return NextResponse.json(userData);

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
  const res = await fetch(`${SERVER_API}/user/${session.user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const updatedUser = await res.json();
  return NextResponse.json(updatedUser);
}