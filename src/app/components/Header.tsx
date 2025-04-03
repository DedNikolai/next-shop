import Link from "next/link";
import { getCategories } from "../services/categories"

export default async function Header() {
    const categories = await getCategories();
    return (
        <header className="flex justify-between p-5">
            <div className="w-[20%]">LOGO</div>
            <ul className="flex w-[60%]">
                {categories.map(category => (
                    <Link key={category.id} href={`/catalog/${category.title}`}>
                        <li 
                            className="mx-3"
                        >
                            {category.title}
                        </li>
                    </Link>

                ))}
            </ul>
            <div className="w-[20$]">LOIGIN | SIGN IN</div>
        </header>
    )
}