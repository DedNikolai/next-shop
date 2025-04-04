import { Category } from "../types/category"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export async function getCategories(url?: string): Promise<Category []> {
    const {data} = await axiosInstance.get<Category []>(`${ApiRoutes.CATEGORIES}?url=${url || ''}`);

    return data;
}

export async function getCategory(id: string): Promise<Category> {
    const {data} = await axiosInstance.get<Category>(`${ApiRoutes.CATEGORIES}/${id}`);
    return data 
}