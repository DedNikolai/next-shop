import { CartItem, Order, Product, User } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

interface CartItemWithProduct extends CartItem {
    product: Product;
}

interface OrderWithUserAndProducts extends Order {
  user?: User,
}

export async function addProductToCart(productId: number, quantity: number): Promise<CartItemWithProduct []> {
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    const {data} = await axiosInstance.post<CartItemWithProduct []>(`${ApiRoutes.CART}`, {productId, quantity, sessionId});

    return data;
}

export async function getCart(): Promise<CartItemWithProduct []> {
    const {data} = await axiosInstance.get<CartItemWithProduct []>(`${ApiRoutes.CART}`);

    return data;
}


export async function updateCartItemQuantity(productId: number, quantity: number): Promise<CartItemWithProduct []> {
    const {data} = await axiosInstance.patch<CartItemWithProduct []>(`${ApiRoutes.CART}`, {productId, quantity});

    return data;
}

