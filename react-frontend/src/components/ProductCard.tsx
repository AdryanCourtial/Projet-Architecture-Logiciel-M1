import { Link } from "react-router";
import Badge from "./Badge";
import Button from "./Button";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-black/30 transition-all duration-200 ease-out hover:scale-[1.02] hover:-rotate-[0.7deg]">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-56 w-full object-cover object-center"
        />
      </Link>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              {product.category}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="text-sm font-extrabold uppercase tracking-[0.08em] text-skate-text"
            >
              {product.name}
            </Link>
          </div>
          {product.badge && <Badge label={product.badge} />}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-base font-black text-skate-text">
            {product.price.toFixed(2)} €
          </p>
          <Button
            variant={product.inStock ? "primary" : "secondary"}
            disabled={!product.inStock}
          >
            {product.inStock ? "ADD TO CART" : "SOLD OUT"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
