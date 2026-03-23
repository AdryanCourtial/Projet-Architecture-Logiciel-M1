import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { getProductById } from "../data/products";

function ProductPage() {
  const { id } = useParams();

  console.log("ProductPage rendered with id:", id);

  const product = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return getProductById(Number(id));
  }, [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase">Product Not Found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.12em] text-acid"
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <img
            src={activeImage}
            alt={product.name}
            className="h-105 w-full border border-white/10 object-cover"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImageIndex(index)}
                className={`border transition-all duration-200 ease-out ${
                  activeImageIndex === index
                    ? "border-acid"
                    : "border-white/20 hover:border-acid"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-24 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acid">
            {product.category}
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-black">{product.price.toFixed(2)} €</p>
            {product.badge && <Badge label={product.badge} />}
          </div>

          <div className="mt-8">
            <Button className="w-full sm:w-auto" disabled={!product.inStock}>
              {product.inStock ? "ADD TO CART" : "SOLD OUT"}
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
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
