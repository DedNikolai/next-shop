import { Category } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { Prisma } from '@prisma/client';

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: { products: true };
}>;

export async function getCategories(url?: string): Promise<Category []> {
    const {data} = await axiosInstance.get<Category []>(`${ApiRoutes.CATEGORIES}?url=${url || ''}`);

    return data;
}

export async function getCategory(id: string): Promise<Category> {
    const {data} = await axiosInstance.get<Category>(`${ApiRoutes.CATEGORIES}/${id}`);
    return data 
}

export async function getCategoryByUrl(url?: string): Promise<CategoryWithProducts> {
    const { data } = await axiosInstance.get<CategoryWithProducts>(`${ApiRoutes.CATEGORIES}?url=${url || ''}`);
    return data;
  }