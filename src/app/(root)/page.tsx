import ProductsSection from "../components/shared/ProductsSection";
import Hero from "../components/shared/Hero";
import Advanteges from "../components/shared/Advanteges";
import { getProducts } from "../services/products";

export default async function Home() {
  const data = await getProducts();
  return (
    <>
      <Hero />
      <Advanteges />
      <ProductsSection
        title="🍕 Популярні страви" 
        products={data.products}
        categoryUrl={data.products[0].category.url}
      />
    </>

  );
}
