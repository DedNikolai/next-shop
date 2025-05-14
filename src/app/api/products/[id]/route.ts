import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        console.log(id)
        const product = await prisma.product.findFirst({
            where: {
                id: +id
            }
        })

        if (!product) {
            return NextResponse.json({message: 'No such product'}, {status: 500})
        }

        return NextResponse.json(product, {status: 200})

    } catch(error) {
        console.log(error)
    }

}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { id } = context.params;

        const existingProduct= await prisma.product.findFirst({
            where: {id: +id}
        })

        if (!existingProduct) {
            return NextResponse.json({message: 'No such product'}, {status: 500})
        }

        const product = await prisma.product.update({
            where: {id: existingProduct.id},
            data: {...body, categoryId: +body.categoryId}
        })

        if (!product) {
            return NextResponse.json({message: 'Cant update product'}, {status: 500})
        }

        return NextResponse.json(product, {status: 200})

    } catch(error) {
        console.log(error)
    }
} 

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;

        const existingProduct = await prisma.product.findFirst({
            where: {id: +id}
        })

        if (!existingProduct) {
            return NextResponse.json({message: 'No such product'}, {status: 500})
        }

        const product = await prisma.product.delete({
            where: {id: existingProduct.id},
        })

        if (!product) {
            return NextResponse.json({message: 'Cant delete product'}, {status: 500})
        }

        return NextResponse.json(product, {status: 200})

    } catch(error) {
        console.log(error)
    }
} 