'use client'

import Image from 'next/image';
import { useState } from 'react';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    title: 'Піца Діабло',
    description: 'Пікантна піца з салямі, перцем чилі та соусом табаско.',
    image: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/62e/4y05ehhgm88eupox5eh111jo1k2e94mq.webp',
    price: 189,
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-10">
      <div className="w-full md:w-1/2 bg-yellow-100 p-6 rounded-3xl flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={350}
          className="rounded-2xl object-contain"
        />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-5 mb-6">
          <button
            onClick={decrement}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-lg hover:bg-gray-100 transition"
          >
            <FaMinus />
          </button>
          <span className="text-2xl font-medium w-6 text-center">{quantity}</span>
          <button
            onClick={increment}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-lg hover:bg-gray-100 transition"
          >
            <FaPlus />
          </button>
        </div>

        <div className="text-2xl font-bold text-red-500 mb-6">
          {product.price * quantity} ₴
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 text-lg transition">
          <FaShoppingCart /> Додати до кошика
        </button>
      </div>
    </div>
  );
}