import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.searchParams.get('url');

        if (!url) {
            const categories =  await prisma.category.findMany();

            if (!categories) {
                return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
            }
            
            return NextResponse.json(categories);
        }  else {
            const category = await prisma.category.findFirst({
                where: {
                    url
                },
                include: {
                    products: true
                }
            })

            return NextResponse.json(category);
        }
        

    } catch(error) {
        console.log(error)
    }

}