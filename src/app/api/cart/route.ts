import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, quantity, sessionId } = body;

  if (!productId || !sessionId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // 1. знайти або створити кошик по sessionId
  let cart = await prisma.cart.findFirst({ where: { sessionId } });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        sessionId,
      },
    });
  }

  // 2. перевірити, чи товар вже є в кошику
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    // 3. якщо є — оновити кількість
    const updated = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
    return NextResponse.json(updated);
  } else {
    // 4. якщо нема — додати новий
    const created = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
    return NextResponse.json(created);
  }
}
