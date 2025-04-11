import ProductsSection from "@/app/components/shared/ProductsSection";
import { getCategories } from "@/app/services/categories";

type Props = {
    params: {
        category: string
    }
}

export default async function CategoryPage({params}: Props) {
    const dada = await params;
    const category = await getCategories(dada.category);

    return (
        <ProductsSection
            title={category[0].title} 
        />
    )
}