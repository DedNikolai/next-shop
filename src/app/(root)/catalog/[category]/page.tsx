import { getCategories } from "@/app/services/categories";

type Props = {
    params: {
        category: string
    }
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({params}: Props) {
    const category = await getCategories(params.category);

    return (
        <h1>Category: {category[0].title}</h1>
    )
}