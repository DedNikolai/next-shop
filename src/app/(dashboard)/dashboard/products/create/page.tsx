'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Category } from '@prisma/client'
import toast from 'react-hot-toast'

const schema = yup.object({
  name: yup.string().required('Назва обов’язкова'),
  imageUrl: yup.string().url('Невірний формат URL').required('URL фото обов’язковий'),
  price: yup.number().positive('Ціна повинна бути більше 0').required('Ціна обов’язкова'),
  description: yup.string().required('Опис обов’язковий'),
  categoryId: yup.string().required('Оберіть категорію'),
  productUrl: yup.string().required('URL товару обов’язковий'),
})

type ProductFormData = {
  name: string
  imageUrl: string
  price: number
  description: string
  categoryId: string
  productUrl: string
}

export default function CreateProductPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [previewImage, setPreviewImage] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesRes = await axios.get('/api/categories');
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Помилка при завантаженні категорій', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await axios.post(`/api/products`, data)
      if (response.status === 200) {
        router.push(`/dashboard/products/edit/${response.data.id}`);
        toast.success('Product updated')
      }
      
    } catch (error) {
      console.error('Помилка при створенні товару', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded"></div>
        ))}
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Створити товар</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Назва</label>
            <input {...register('name')} className="input w-full border px-3 py-2 rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">URL фото</label>
            <input
              {...register('imageUrl')}
              className="input w-full border px-3 py-2 rounded"
              onBlur={(e) => setPreviewImage(e.target.value)}
            />
            {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Ціна</label>
            <input
              type="number"
              {...register('price')}
              className="input w-full border px-3 py-2 rounded"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Опис</label>
            <textarea
              {...register('description')}
              className="input w-full border px-3 py-2 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Категорія</label>
            <select {...register('categoryId')} className="input w-full border px-3 py-2 rounded">
              <option value="">Оберіть категорію</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">URL товару</label>
            <input
              {...register('productUrl')}
              className="input w-full border px-3 py-2 rounded"
            />
            {errors.productUrl && <p className="text-red-500 text-sm">{errors.productUrl.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Збереження...' : 'Створити товар'}
          </button>
        </div>

        <div className="flex justify-center items-start">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Прев’ю товару"
              className="max-w-xs rounded border shadow-md"
            />
          ) : (
            <div className="text-gray-500 italic">Зображення не доступне</div>
          )}
        </div>
      </form>
    </div>
  )
}
