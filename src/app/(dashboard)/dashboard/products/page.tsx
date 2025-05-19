'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteProduct, getProducts, ProductsWithCategory } from '@/app/services/products'
import toast from 'react-hot-toast'

export default function AdminProductListPage() {
  const [products, setProducts] = useState<ProductsWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const ITEMS_PER_PAGE = 10
  const router = useRouter();

  async function fetchProducts() {
    setLoading(true)
    const { products, total } = await getProducts(page, ITEMS_PER_PAGE)
    setProducts(products)
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  const handleDelete = async (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цей товар?")) {
      // await deleteProductById(id)
      deleteProduct(id).then(res => {
        if (res.status === 200) {
          toast.success('Product deleted succesfully');
          fetchProducts();
        }
      }) 
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Список товарів</h1>
        <Link href="/dashboard/products/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
            Додати новий товар
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
            <div key={idx} className="flex items-center space-x-4 border-b py-2">
              <div className="w-16 h-16 bg-gray-300 rounded" />
              <div className="flex-1 h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-24" />
              <div className="h-4 bg-gray-300 rounded w-20" />
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Фото</th>
              <th className="p-2 text-left">Назва</th>
              <th className="p-2 text-left">Ціна</th>
              <th className="p-2 text-left">Дата створення</th>
              <th className="p-2 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td className="p-2">
                  <img
                    src={product.imageUrl || '/no-image.png'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 font-medium">{product.name}</td>
                <td className="p-2">{product.price} ₴</td>
                <td className="p-2">
                  {new Date(product.createAt).toLocaleDateString('uk-UA')}
                </td>
                <td className="p-2 space-x-2">
                  <Link href={`/dashboard/products/edit/${product.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow">
                      Редагувати
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Пагінація */}
      {!loading && (
        <div className="flex justify-center items-center gap-4 mt-6 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Назад
          </button>
          <span className="font-semibold">
            Сторінка {page} з {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  )
}
