import { SERVER_API } from "@/app/constants/app";
import { Category } from "@/app/types/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.searchParams.get('url');
        
        const data = await fetch(`${SERVER_API}/category?url=${url}`);

        if (!data.ok) {
            return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
        }
        const categories: Category [] = await data.json();
        
        return NextResponse.json(categories);
    } catch(error) {
        console.log(error)
    }

}