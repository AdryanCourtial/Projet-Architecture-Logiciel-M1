import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

type ShopCategory = "All" | (typeof categories)[number];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Shop
      </h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {(["All", ...categories] as const).map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-sm border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition-all duration-200 ease-out ${
                isActive
                  ? "border-acid bg-acid text-bgPrimary"
                  : "border-white/30 text-textPrimary hover:border-acid hover:text-acid"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
