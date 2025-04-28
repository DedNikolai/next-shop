'use client'

import CartSkeleton from '@/app/components/shared/CartSkeleton';
import { useCartStore } from '@/app/store/cart-store';
import { useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, fetchCart, removeItem, loading, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <CartSkeleton />

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Ваш кошик порожній 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">🛒 Мій кошик</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white shadow p-4 rounded-lg gap-4">
                {/* Фото і Назва */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
                    <div>
                    <h3 className="text-base sm:text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.price} ₴</p>
                    </div>
                </div>

                {/* Кількість і ціна */}
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center">
                    {/* Кнопки зміни кількості */}
                    <div className="flex items-center gap-2">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 sm:p-2 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={item.quantity <= 1}
                    >
                        <FaMinus size={14} />
                    </button>
                    <span className="text-base font-bold">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 sm:p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        <FaPlus size={14} />
                    </button>
                    </div>

                    {/* Ціна за товар */}
                    <div className="text-base sm:text-lg font-semibold">
                    {item.product.price * item.quantity} ₴
                    </div>

                    {/* Видалити товар */}
                    <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                    >
                    <FaTrash size={16} />
                    </button>
                </div>
                </div>

        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-xl p-6 mt-8 gap-4">
        {/* Загальна сума */}
        <div className="text-xl font-bold text-gray-800">
            Загальна сума: <span className="text-red-500">{total} ₴</span>
        </div>

        {/* Кнопка оформити */}
        <button
            onClick={() => {}}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full text-center transition w-full sm:w-auto"
        >
            Оформити замовлення
        </button>
        </div>

    </div>
  );
}
