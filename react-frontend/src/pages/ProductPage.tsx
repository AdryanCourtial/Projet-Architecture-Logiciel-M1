import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Button from "../components/Button";
import { getProductById } from "../products/product.api";
import type { Product } from "../products/product.types";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setErrorMessage("Product ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to load product"
        );
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.14em] text-white/60">
          Loading product...
        </p>
      </section>
    );
  }

  if (!product || errorMessage) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase">Product Not Found</h1>
        {errorMessage && (
          <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
        )}
        <Link
          to="/shop"
          className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.12em] text-acid"
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  const imageUrl =
    product.image || "https://via.placeholder.com/600x600?text=No+Image";
  const categoryName = product.category?.name || "Uncategorized";
  const isInStock = product.stock > 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-105 w-full border border-white/10 object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acid">
            {categoryName}
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-black">{product.price.toFixed(2)} €</p>
            <span
              className={`text-xs font-bold uppercase tracking-[0.12em] ${
                isInStock ? "text-green-400" : "text-red-400"
              }`}
            >
              {isInStock ? `Stock: ${product.stock}` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-8">
            <Button className="w-full sm:w-auto" disabled={!isInStock}>
              {isInStock ? "ADD TO CART" : "SOLD OUT"}
            </Button>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h2 className="text-sm font-black uppercase tracking-[0.12em]">
              Description
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/75">
              {product.description}
            </p>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-10 border-t border-white/10 pt-6">
              <h2 className="text-sm font-black uppercase tracking-[0.12em]">
                Reviews
              </h2>
              <div className="mt-4 space-y-3">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-acid/30 pl-3 text-sm"
                  >
                    <p className="font-bold text-white">{review.author}</p>
                    <p className="text-sm text-white/70">{review.comment}</p>
                    <p className="text-xs text-white/50">
                      Rating: {review.rating}/5
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
