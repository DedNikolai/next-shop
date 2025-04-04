import { SERVER_API } from "@/app/constants/app";
import { Category } from "@/app/types/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        
        const params = await context.params;
        console.log(params.id)
        const id = Number(params.id);
        const data = await fetch(`${SERVER_API}/category/${id}`);

        if (!data.ok) {
            return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
        }
        const category: Category = await data.json();
        
        return NextResponse.json(category);
    } catch(error) {
        console.log(error)
    }

}