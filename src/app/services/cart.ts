import { CartItem } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export async function addProductToCart(productId: number, quantity: number): Promise<CartItem> {
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    const {data} = await axiosInstance.post<CartItem>(`${ApiRoutes.CART}`, {productId, quantity, sessionId});

    return data;
}