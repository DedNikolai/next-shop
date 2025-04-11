'use client';

import { FaTruck, FaRegSmileBeam } from 'react-icons/fa';
import { GiMeal, GiHotSpices } from 'react-icons/gi';

const advantages = [
  {
    icon: <FaTruck className="text-red-500 text-4xl" />,
    title: 'Швидка доставка',
    description: 'Доставляємо за 30 хвилин або швидше прямо до вашого порогу.',
  },
  {
    icon: <GiMeal className="text-yellow-500 text-4xl" />,
    title: 'Свіжі інгредієнти',
    description: 'Використовуємо лише натуральні та якісні продукти.',
  },
  {
    icon: <GiHotSpices className="text-orange-500 text-4xl" />,
    title: 'Смачна кухня',
    description: 'Наші кухарі — справжні майстри у приготуванні улюблених страв.',
  },
  {
    icon: <FaRegSmileBeam className="text-pink-500 text-4xl" />,
    title: 'Щасливі клієнти',
    description: 'Тисячі позитивних відгуків — найкраще підтвердження нашої якості.',
  },
];

export default function Advantages() {
  return (
    <section className="bg-yellow-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Чому обирають FoodExpress?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
