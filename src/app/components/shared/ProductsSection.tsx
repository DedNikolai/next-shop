import { FC } from "react";
import { ProductItem } from "./ProductItem";

interface Props {
    title: string;
}

const mockProducts = [
    {
        id: '1',
        title: 'Піца Маргарита',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/62e/4y05ehhgm88eupox5eh111jo1k2e94mq.webp',
        price: 179,
        url: 'margarite',
        category: {
            url: 'pizza'
        }
    },
    {
        id: '2',
        title: 'Піца Діабло',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://ecopizza.com.ua/548-large_default/pizza-4-meat.jpg',
        price: 220,
        url: 'diablo',
        category: {
            url: 'pizza'
        }
    },
    {
        id: '3',
        title: 'Піца Пікантна',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkVS9ToD0S4z1yCJLarp1eqfSVsbOkcHBRE6GzkGIqu1h-6Gl-HYtKCN516Vd3y_KvpY&usqp=CAU',
        price: 195,
        url: 'pikantna',
        category: {
            url: 'pizza'
        }
    },

    {
        id: '4',
        title: 'Бургер Мега',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://kvadratsushi.com/wp-content/uploads/2023/06/burger_amerykanskyi_new.jpg',
        price: 255,
        url: 'meta',
        category: {
            url: 'burgers'
        }
    },
    {
        id: '5',
        title: 'Бургер Роял',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://images-ru.starterapp.ru/w:1024/aHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9qOHRtenNtNS9wcm9kdWN0aW9uL2M3YWE4OTM5ODNmYTM3ZTcxM2U2ODNiYzVjMzA3ZDYyMWZkNzZjYTktNjAweDQ1MC5qcGc=',
        price: 255,
        url: 'royal',
        category: {
            url: 'burgers'
        }
    },
    {
        id: '6',
        title: 'Бургер Классік',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMMcvyVv31rJSv4xgfuzNClw-yCnLHpKTMJBzBW3gEkF21urjk8Kw1evK5jlt2KVx3h4&usqp=CAU',
        price: 210,
        url: 'classik-burger',
        category: {
            url: 'burgers'
        }
    },
    {
        id: '7',
        title: 'Сет Японія',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://rocosushi.com/web/uploads/products/6c18398910d7d0f7b0cf-%D0%A1%D0%B5%D1%82-1.png',
        price: 350,
        url: 'yaponiya',
        category: {
            url: 'sushi'
        }
    },
    {
        id: '8',
        title: 'Сет Окфнава',
        description: 'Класика з томатами та сиром',
        imageUrl: 'https://online-sushi.com.ua/image/catalog/imagesforpages/dostavka-nigiri-v-kieve.jpg',
        price: 310,
        url: 'okinava',
        category: {
            url: 'burgers'
        }
    },
]

const ProductsSection: FC<Props> = ({title}) => {
    return (
        <section className="bg-yellow-50 py-16 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mockProducts.map(product => (
                        <ProductItem
                            key={product.id}
                            title={product.title} 
                            description={product.description}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            url={product.url}
                            categoryUrl={product.category.url}
                        />
                    ))}
                
                </div>
            </div>
            </section>

    )
}

export default ProductsSection;