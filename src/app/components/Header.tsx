import Link from "next/link";
import { getCategories } from "../services/categories"
import { ApiRoutes } from "../services/constants";
import AuthMenu from "./AuthMenu";

export default async function Header() {
    const categories = await getCategories();
    return (
        <header className="flex justify-between p-5">
            <Link href={'/'}>
                <div className="w-[20%]">LOGO</div>
            </Link>
            <ul className="flex w-[60%]">
                {categories.map(category => (
                    <Link key={category.id} href={`${ApiRoutes.CATALOG}/${category.url}`}>
                        <li 
                            className="mx-3"
                        >
                            {category.title}
                        </li>
                    </Link>

                ))}
            </ul>
            <AuthMenu />
        </header>
    )
}