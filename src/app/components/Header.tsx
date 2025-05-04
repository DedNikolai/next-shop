import Link from "next/link";
import { getCategories } from "../services/categories"
import { ApiRoutes } from "../services/constants";
import AuthMenu from "./AuthMenu";
import Image from "next/image";
import SearchInput from "./shared/SearchInput";
import { FaShoppingCart } from "react-icons/fa";
import {CartIcon} from "./shared/CartIcon";

export default async function Header() {
    const categories = await getCategories();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
            {/* Desktop Layout */}
            <div className="hidden md:block">
                {/* Row 1: Logo + Search + Auth */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/pizza-hero.png" alt="logo" width={28} height={28} />
                        <span className="text-xl font-bold text-red-600">FoodExpress</span>
                    </Link>
                    <div className="flex-1 max-w-xl mx-4">
                        <SearchInput />
                    </div>
                    <AuthMenu />
                </div>

                {/* Row 2: Navigation + Cart */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
                    <nav className="flex gap-6 text-sm font-medium">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`${ApiRoutes.CATALOG}/${category.url}`}
                                className="hover:text-red-500 transition"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                    <CartIcon />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden px-4 py-2 space-y-2">
                {/* Row 1: Logo + Auth */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/pizza-hero.png" alt="logo" width={28} height={28} />
                        <span className="text-xl font-bold text-red-600">FoodExpress</span>
                    </Link>
                    <AuthMenu />
                </div>

                {/* Row 2: Search */}
                <div>
                    <SearchInput />
                </div>

                {/* Row 3: Menu + Cart */}
                <div className="flex items-center justify-between">
                    <nav className="flex flex-wrap gap-4 text-sm font-medium">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`${ApiRoutes.CATALOG}/${category.url}`}
                                className="hover:text-red-500 transition"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                    <CartIcon />
                </div>
            </div>
        </header>
    )
}
