import ProductsSection from "../components/shared/ProductsSection";
import Hero from "../components/shared/Hero";
import Advanteges from "../components/shared/Advanteges";
import { getProducts } from "../services/products";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <Advanteges />
      <ProductsSection
        title="🍕 Популярні страви" 
        products={products}
        categoryUrl={products[0].category.url}
      />
    </>

  );
}
