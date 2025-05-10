'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/app/store/cart-store';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import OrderSkeleton from '@/app/components/shared/OrderSkeleton';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  fullName: yup.string().required('Введіть ПІБ'),
  email: yup.string().email('Невірний email').required('Email обов’язковий'),
  phone: yup.string().required('Введіть телефон'),
  address: yup.string().required('Введіть адресу доставки'),
  paymentType: yup.mixed<'cash' | 'card'>()
    .oneOf(['cash', 'card'], 'Оберіть спосіб оплати')
    .required('Оберіть спосіб оплати'),
});

type OrderFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment?: string | null;
  paymentType: 'cash' | 'card';
}


export default function OrderPage() {
  const { data: session } = useSession();
  const { cartItems, fetchCart, loading, createOrder, setLoading } = useCartStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    fetchCart();
    if (session?.user) {
      setValue('fullName', session.user.name || '');
      setValue('email', session.user.email || '');
    }
  }, [session, setValue]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const onSubmit = (data: OrderFormData) => {
    createOrder({ ...data, items: JSON.parse(JSON.stringify(cartItems)), total: totalPrice, userId: Number(session?.user.id) })
    .then(res => {
      if (res.id) {
        router.push(`/order/success/${res.id}`);
      }
    }).finally(() => setLoading(true))
  };

  if (loading) return <OrderSkeleton />

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold">Оформлення замовлення</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              placeholder="ПІБ"
              {...register('fullName')}
              className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Email"
              {...register('email')}
              className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Телефон"
              {...register('phone')}
              className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Адреса доставки"
              {...register('address')}
              className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Коментар (необов'язково)"
            {...register('comment')}
            className="w-full p-3 border rounded min-h-[80px]"
          />
          <p className="text-red-500 text-sm">{errors.comment?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Спосіб оплати</label>
          <select
            {...register('paymentType')}
            className="w-full p-3 border rounded"
          >
            <option value="">Оберіть спосіб оплати</option>
            <option value="cash">Готівка</option>
            <option value="card">Картка</option>
          </select>
          <p className="text-red-500 text-sm">{errors.paymentType?.message}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Товари у кошику</h3>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.product.name} x {item.quantity}</span>
                <span>{item.product.price * item.quantity} ₴</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold pt-4">
            <span>Загальна сума:</span>
            <span>{totalPrice} ₴</span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600 transition"
        >
          Підтвердити замовлення
        </button>
      </form>
    </div>
  );
}
