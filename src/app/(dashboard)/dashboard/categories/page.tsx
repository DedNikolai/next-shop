"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CategorySkeleton from "@/app/components/admin/CategorySkeleton";
import { Category } from "@prisma/client";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required('Поле обовʼязкове'),
  url: yup.string().required('Поле обовʼязковий'),
});

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors}
  } = useForm({ 
    defaultValues: { name: "", url: "" },
    resolver: yupResolver(schema)
});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/categories");
    setCategories(res.data);
    setIsLoading(false)
  };

  const onSubmit = async (data: { name: string; url: string }) => {
    if (editingCategory) {
      await axios.put(`/api/categories/${editingCategory.id}`, data).then(res => {
        if (res.status === 200) {
            toast.success('Category updated')
        }
      });
    } else {
      await axios.post("/api/categories", data).then(res => {
        if (res.status === 200) {
            toast.success('Category created')
        }
      });
    }
    reset();
    setEditingCategory(null);
    fetchCategories();
  };

  const onEdit = (category: Category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("url", category.url);
  };

  const onDelete = async (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
      await axios.delete(`/api/categories/${id}`).then(res => {
        if (res.status === 200) {
            toast.success('Category deleted')
        }
      });
      fetchCategories();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Категорії товарів</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block font-medium mb-1 text-gray-700">Назва категорії</label>
        <input
          {...register("name", { required: true })}
          placeholder="Назва категорії"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        <label className="block font-medium mb-1 text-gray-700">URL категорії</label>
        <input
          {...register("url", { required: true })}
          placeholder="URL категорії"
          className="w-full p-2 border rounded"
        />
        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingCategory ? "Оновити категорію" : "Додати категорію"}
        </button>
      </form>

      <ul className="divide-y">
        {isLoading ? <CategorySkeleton /> : categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center py-2">
            <div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm text-gray-500">{category.url}</div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(category)}
                className="text-blue-500 hover:underline"
              >
                Редагувати
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="text-red-500 hover:underline"
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
