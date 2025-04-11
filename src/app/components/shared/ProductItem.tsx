import { ApiRoutes } from "@/app/services/constants";
import Link from "next/link";
import { FC } from "react";

interface Props {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    url: string;
    categoryUrl: string
}


export const ProductItem: FC<Props> = ({title, description, imageUrl, price, url, categoryUrl}) => {
    return (
        <Link href={`${ApiRoutes.CATALOG}/${categoryUrl}/${url}`}>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                <img src={imageUrl} alt={title} className="rounded-lg w-full h-48 object-cover mb-4" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-600 text-sm mb-2">{description}</p>
                <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-red-500 text-lg">{price} ₴</span>
                <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition">Замовити</button>
                </div>
            </div>
        </Link>
    )
}

