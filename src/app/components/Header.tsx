import Link from "next/link";
import { getCategories } from "../services/categories"
import { ApiRoutes } from "../services/constants";
import AuthMenu from "./AuthMenu";

export default async function Header() {
    const categories = await getCategories();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="text-xl font-bold text-red-600 hover:opacity-80 transition">
                🍕 FoodExpress
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    {categories.map(category => (
                        <Link 
                            key={category.id} 
                            href={`${ApiRoutes.CATALOG}/${category.url}`}
                            className="hover:text-red-500 transition"
                        >
                            {category.title}
                        </Link>
                    ))}
                </nav >
                <AuthMenu />
            </div>
        </header>
    )
}