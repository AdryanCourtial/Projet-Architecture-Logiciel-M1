import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../products/product.api";
import { MOCK_CATEGORIES, type Product } from "../products/product.types";
import { getApiErrorMessage } from "../auth/auth.api";

type ShopCategory = "All" | number;

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const categoryId = selectedCategory === "All" ? undefined : selectedCategory;
        const data = await getProducts(page, 12, categoryId);
        setProducts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, [selectedCategory, page]);

  const handleCategoryChange = (category: ShopCategory) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Shop
      </h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {(["All", ...MOCK_CATEGORIES] as const).map((category) => {
          const categoryValue: ShopCategory =
            category === "All" ? "All" : category.id;
          const categoryLabel = category === "All" ? "All" : category.name;
          const isActive = selectedCategory === categoryValue;

          return (
            <button
              key={categoryValue}
              onClick={() => handleCategoryChange(categoryValue)}
              className={`rounded-sm border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition-all duration-200 ease-out ${
                isActive
                  ? "border-acid bg-acid text-bgPrimary"
                  : "border-white/30 text-textPrimary hover:border-acid hover:text-acid"
              }`}
            >
              {categoryLabel}
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p className="mt-6 border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <p className="mt-8 text-center text-sm uppercase tracking-[0.14em] text-white/60">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="mt-8 text-center text-sm uppercase tracking-[0.14em] text-white/60">
          No products found in this category.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && products.length > 0 && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-sm border border-white/30 px-4 py-2 text-xs font-bold uppercase disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs uppercase tracking-[0.12em] text-white/70">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-sm border border-white/30 px-4 py-2 text-xs font-bold uppercase disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default Shop;
