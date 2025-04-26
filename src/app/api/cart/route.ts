import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = req.headers.get('session-id');
  const { productId, quantity } = body;

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

  } else {
    // 4. якщо нема — додати новий
    const created = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

  }

  const updatedCard = await prisma.cart.findFirst({ 
    where: { sessionId },
    include: {
      items: {
      include: {
          product: true,
      }
      }
  }
  }); 
  return NextResponse.json(updatedCard?.items || []);
}

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.headers.get('session-id') || req.nextUrl.searchParams.get('session-id');

        if (!sessionId) {
            return NextResponse.json([]);
        }
    
        const cart = await prisma.cart.findFirst({
        where: { sessionId },
        include: {
            items: {
            include: {
                product: true,
            }
            }
        }
        });
    
        if (!cart) {
            return NextResponse.json([]);
        }
    
        return NextResponse.json(cart.items);
    } catch(error) {
        console.log('Server error', error);
        return NextResponse.json({ message: 'Cant get cart' }, { status: 500 });
    }
  }
