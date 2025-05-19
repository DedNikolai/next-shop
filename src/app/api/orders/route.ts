import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get('page') || '1')
  const limit = 10
  const skip = (page - 1) * limit

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.count()
    ])

    return NextResponse.json({ orders, total })
  } catch (error) {
    console.error('Order fetch error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
