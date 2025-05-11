import ProductsSection from "@/app/components/shared/ProductsSection";
import { getCategoryByUrl } from "@/app/services/categories";
import { notFound } from "next/navigation";

type Props = {
    params: {
        category: string
    }
}

export default async function CategoryPage({params}: Props) {
    const dada = await params;
    const category = await getCategoryByUrl(dada.category);

    if (!category) {
        notFound()
    }

    return (
        <ProductsSection
            title={category.name} 
            categoryUrl={category.url}    
            products={category.products}        
        />
    )
}