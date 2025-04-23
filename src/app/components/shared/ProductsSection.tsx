import { FC } from "react";
import { ProductItem } from "./ProductItem";
import { Product } from "@prisma/client";

interface Props {
    title: string;
    products: Product [];
    categoryUrl: string;
}

const ProductsSection: FC<Props> = ({title, products, categoryUrl}) => {
    return (
        <section className="bg-yellow-50 py-16 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            title={product.name} 
                            description={product.description}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            url={product.productUrl}
                            categoryUrl={categoryUrl}
                        />
                    ))}
                
                </div>
            </div>
            </section>

    )
}

export default ProductsSection;