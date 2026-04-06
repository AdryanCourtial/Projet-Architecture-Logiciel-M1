import { Link } from "react-router";
import Button from "./Button";
import type { Product } from "../products/product.types";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image || "https://via.placeholder.com/300x300?text=No+Image";
  const categoryName = product.category?.name || "Uncategorized";
  const isInStock = product.stock > 0;

  return (
    <article className="group overflow-hidden border border-white/10 bg-black/30 transition-all duration-200 ease-out hover:scale-[1.02] hover:-rotate-[0.7deg]">
      <Link to={`/product/${product.id}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="h-56 w-full object-cover object-center"
        />
      </Link>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              {categoryName}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary"
            >
              {product.name}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-base font-black text-textPrimary">
            {product.price.toFixed(2)} €
          </p>
          <Button
            variant={isInStock ? "primary" : "secondary"}
            disabled={!isInStock}
          >
            {isInStock ? "ADD TO CART" : `SOLD OUT (${product.stock})`}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
