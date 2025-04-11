import Link from "next/link";

export default function NotAuth() {

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-xl w-full">
        <div className="text-red-500 text-5xl mb-4">
        <div className="text-5xl mb-4">🔒</div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Доступ заборонено</h1>
        <p className="text-gray-600 mb-6">
          Вибачте, але у вас немає прав для перегляду цієї сторінки. Будь ласка, авторизуйтесь як користувач або адміністратор.
        </p>
        <Link href={'/'}>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Повернутись на головну
          </button>
        </Link>
      </div>
    </div>
  );
}
