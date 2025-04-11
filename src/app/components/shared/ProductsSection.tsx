import { FC } from "react";

interface Props {
    title: string;
}

const ProductsSection: FC<Props> = ({title}) => {
    return (
        <section className="bg-yellow-50 py-16 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Card */}
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://pizza.od.ua/upload/resize_cache/webp/iblock/62e/4y05ehhgm88eupox5eh111jo1k2e94mq.webp" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://ecopizza.com.ua/548-large_default/pizza-4-meat.jpg" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkVS9ToD0S4z1yCJLarp1eqfSVsbOkcHBRE6GzkGIqu1h-6Gl-HYtKCN516Vd3y_KvpY&usqp=CAU" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://kvadratsushi.com/wp-content/uploads/2023/06/burger_amerykanskyi_new.jpg" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://images-ru.starterapp.ru/w:1024/aHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9qOHRtenNtNS9wcm9kdWN0aW9uL2M3YWE4OTM5ODNmYTM3ZTcxM2U2ODNiYzVjMzA3ZDYyMWZkNzZjYTktNjAweDQ1MC5qcGc=" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMMcvyVv31rJSv4xgfuzNClw-yCnLHpKTMJBzBW3gEkF21urjk8Kw1evK5jlt2KVx3h4&usqp=CAU" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://rocosushi.com/web/uploads/products/6c18398910d7d0f7b0cf-%D0%A1%D0%B5%D1%82-1.png" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    <img src="https://online-sushi.com.ua/image/catalog/imagesforpages/dostavka-nigiri-v-kieve.jpg" alt="Маргарита" className="rounded-lg w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">Піца Маргарита</h3>
                    <p className="text-gray-600 text-sm mb-2">Класика з томатами та сиром</p>
                    <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500 text-lg">179 ₴</span>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                    </div>
                </div>
                
                </div>
            </div>
            </section>

    )
}

export default ProductsSection;