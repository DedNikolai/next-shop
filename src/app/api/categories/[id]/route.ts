import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        

    } catch(error) {
        console.log(error)
    }

}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { id } = context.params;

        const existingCategory = await prisma.category.findFirst({
            where: {id: +id}
        })

        if (!existingCategory) {
            return NextResponse.json({message: 'No such category'}, {status: 500})
        }

        const category = await prisma.category.update({
            where: {id: existingCategory.id},
            data: {...body}
        })

        if (!category) {
            return NextResponse.json({message: 'Cant update category'}, {status: 500})
        }

        return NextResponse.json(category, {status: 200})

    } catch(error) {
        console.log(error)
    }
} 

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;

        const existingCategory = await prisma.category.findFirst({
            where: {id: +id}
        })

        if (!existingCategory) {
            return NextResponse.json({message: 'No such category'}, {status: 500})
        }

        const category = await prisma.category.delete({
            where: {id: existingCategory.id},
        })

        if (!category) {
            return NextResponse.json({message: 'Cant delete category'}, {status: 500})
        }

        return NextResponse.json(category, {status: 200})

    } catch(error) {
        console.log(error)
    }
} 