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
          orderBy: {createAt: 'desc'},
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

  export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const product = await prisma.product.create({
            data: {...body, categoryId: +body.categoryId}
        })

        if (!product) {
            return NextResponse.json({message: 'Cant create product'}, {status: 500})
        }

        return NextResponse.json(product, {status: 200})

    } catch(error) {
        console.log(error)
    }
} 
  