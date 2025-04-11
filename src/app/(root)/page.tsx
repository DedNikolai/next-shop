import ProductsSection from "../components/shared/ProductsSection";
import Hero from "../components/shared/Hero";
import Advanteges from "../components/shared/Advanteges";

export default function Home() {
  return (
    <>
      <Hero />
      <Advanteges />
      <ProductsSection
        title="🍕 Популярні страви" 
      />
    </>

  );
}
