import { Category } from "../types/category"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export async function getCategories(): Promise<Category []> {
    const {data} = await axiosInstance.get<Category []>(ApiRoutes.CATEGORIES);

    return data;
}