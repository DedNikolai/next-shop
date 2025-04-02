type Props = {
    params: {
        category: string
    }
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({params}: Props) {
    const category = params.category;

    return (
        <h1>Category: {category}</h1>
    )
}