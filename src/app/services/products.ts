import { Prisma, Product } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export type ProductsWithCategory= Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductResponse = {
  products: ProductsWithCategory [],
  total: number;
  page: number;
  totalPages: number;
}

export async function getProducts(page?: number, limit?: number): Promise<ProductResponse> {
    let url = `${ApiRoutes.PRODUCTS}`;
    if (page && limit) {
      url = `${ApiRoutes.PRODUCTS}?page=${page}&limit=${limit}`
    }
    const {data} = await axiosInstance.get<ProductResponse>(url);

    return data;
}

export async function fetchProductByUrl(url:string) {
  const {data} = await axiosInstance.get<Product>(`${ApiRoutes.PRODUCTS}/${ApiRoutes.PODUCT_BY_URL}?query=${url}`)
  return data
}

export async function deleteProduct(productId: number) {
  const result = await axiosInstance.delete(`${ApiRoutes.PRODUCTS}/${productId}`)
  return result;
}