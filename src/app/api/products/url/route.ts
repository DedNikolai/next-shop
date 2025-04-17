import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get('query');
        const product =  await prisma.product.findFirst({
            where: {
                productUrl: query?.toString()
            }
        });

        if (!product) {
            return NextResponse.json({ error: "No such product" }, { status: 500 });
        }
        
        return NextResponse.json(product);
        

    } catch(error) {
        console.log(error)
    }
}