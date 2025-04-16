import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        const products =  await prisma.product.findMany({
            include: {
                category: true
            }
        });
        if (!products) {
            return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }
        
        return NextResponse.json(products);
        

    } catch(error) {
        console.log(error)
    }
}