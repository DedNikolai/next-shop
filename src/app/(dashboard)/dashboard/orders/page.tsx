'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
}

interface CartItem {
  id: number
  quantity: number
  product: Product
}

interface Order {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  comment: string
  total: number
  paymentType: string
  items: any
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/orders?page=${page}`).then(res => {
      setOrders(res.data.orders)
      setTotalPages(Math.ceil(res.data.total / 10))
      setLoading(false)
    })
  }, [page])

  if (loading) return <p>Завантаження...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Список замовлень</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded p-4 shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Замовлення №{order.id}</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                <p>{order.fullName} — {order.phone}</p>
                <p className="text-sm text-gray-600">{order.address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{order.total} ₴</p>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              {Array.isArray(order.items) ? (
                order.items.map((item: CartItem) => (
                  <p key={item.id}>{item.product?.name} — {item.quantity} шт.</p>
                ))
              ) : (
                <p className="text-red-500">Помилка відображення товарів</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Назад</button>
        <span className="px-4 py-1">Сторінка {page} з {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Вперед</button>
      </div>
    </div>
  )
}
