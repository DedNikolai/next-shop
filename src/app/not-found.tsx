'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4 text-center">
      <Image
        src="/pizza-hero.png"
        alt="404"
        width={100}
        height={100}
        className="mb-4"
      />
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Сторінку не знайдено
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Упс! Схоже, що така сторінка не існує. Можливо вона була переміщена або видалена.
      </p>
      <Link href="/">
        <span className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition">
          На головну
        </span>
      </Link>
    </div>
  );
}
