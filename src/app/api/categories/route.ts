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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {name, url} = body;

        if (!name || !url) {
            return NextResponse.json({ error: "No neede data" }, { status: 500 });
        }

        const category = await prisma.category.create({
            data: {
                name, url
            }
        })

        if (!category) {
            return NextResponse.json({ error: "Cant create category" }, { status: 500 });
        }

        return NextResponse.json(category, {status: 200})
    } catch(error) {
        console.log(error)
    }
}