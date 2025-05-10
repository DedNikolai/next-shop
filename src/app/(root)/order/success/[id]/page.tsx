// app/order/success/page.tsx

type Props = {
  params: {
      id: string
  }
}

export default async function OrderSuccessPage({params}: Props) {
    const dada = await params;
    const orderNumber = dada.id;

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Замовлення оформлено!</h1>
          <p className="text-gray-700 text-lg mb-6">
            {`Дякуємо за Ваше замовлення №${orderNumber} . Ми вже працюємо над його обробкою.`}
          </p>
          <a href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition">
            Повернутись на головну
          </a>
        </div>
      </div>
    );
  }
  