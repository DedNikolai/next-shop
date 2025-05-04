import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
      const body = await req.json();
      const sessionId = req.headers.get('session-id');
      const {userId, fullName, email, 
        phone, address, comment, total, paymentType, items } = body;
    
      if (!sessionId) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
      }

      const order = await prisma.order.create({
        data: {
            user: userId ? { connect: { id: userId } } : undefined,
            fullName,
            email,
            phone,
            address,
            comment,
            total,
            paymentType,
            items,
            token: sessionId
        }
      })

      if (!order) {
        return NextResponse.json({ error: "Error creating order" }, { status: 400 });
      }

      const cart = await prisma.cart.findFirst({
        where: { sessionId },
        include: { items: true },
      });
      
      // 2. Видалити всі CartItem цього кошика
      if (cart) {
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      return NextResponse.json(order, { status: 200 });
 
    }