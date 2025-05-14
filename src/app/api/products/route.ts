import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;
  
      const [total, products] = await Promise.all([
        prisma.product.count(),
        prisma.product.findMany({
          skip,
          take: limit,
          include: {
            category: true,
          },
        }),
      ]);
  
      return NextResponse.json({
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
  }
  