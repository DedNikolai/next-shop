'use client'

import { useCartStore } from "@/app/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useShallow } from "zustand/shallow";

export function CartIcon() {
  const [cartItems, fetchCart, loading] = useCartStore(
    useShallow(state => [
      state.cartItems,
      state.fetchCart,
      state.loading
    ])
  );

  useEffect(() => {
    fetchCart();
  }, []);
  

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <Link href="/cart" className="text-red-600 text-xl">
        <FaShoppingCart className="w-6 h-6" />
      </Link>
      <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 shadow-md font-bold">
        {loading ? (
        <svg
            className="animate-spin w-3 h-3 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            />
            <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
            />
        </svg>
        ) : (
        totalItems
        )}
  </span>
    </div>
  );
}
