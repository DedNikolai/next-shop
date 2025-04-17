import { Prisma, Product } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export type ProductsWithCategory= Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export async function getProducts(): Promise<ProductsWithCategory []> {
    const {data} = await axiosInstance.get<ProductsWithCategory []>(`${ApiRoutes.PRODUCTS}`);

    return data;
}