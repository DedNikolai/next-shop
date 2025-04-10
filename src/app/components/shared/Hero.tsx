'use client';

export default function Hero() {
  return (
    <section className="relative bg-yellow-100 py- px-4 sm:px-8 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Доставка піци, суші <br /> бургерів і снеків
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Замовляй свої улюблені страви — гарячі, свіжі та смачні. Швидка доставка до твоїх дверей!
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition">
          Замовити зараз 🍕
        </button>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="/pizza-hero.png"
          alt="Pizza delivery"
          className="w-full max-w-md mx-auto drop-shadow-xl"
        />
      </div>
    </section>
  );
}
