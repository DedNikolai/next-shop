'use client';

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/app/services/constants";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { addProductToCart } from "@/app/services/cart";
import toast from "react-hot-toast";

interface Props {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  url: string;
  categoryUrl: string;
}

export const ProductItem: FC<Props> = ({ id, title, description, imageUrl, price, url, categoryUrl }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOrder = () => {
   addProductToCart(id, quantity).then(res => {
    if (res.id) {
      toast.success('Product added')
    }
   })
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`${ApiRoutes.CATALOG}/${categoryUrl}/${url}`)}
      >
        <img
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="rounded-lg w-full h-48 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-red-500 text-lg">{price} ₴</span>

        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-100"
          >
            <FaMinus />
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-100"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="mt-3 w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition"
      >
        <FaShoppingCart /> Додати до кошика
      </button>
    </div>
  );
};
