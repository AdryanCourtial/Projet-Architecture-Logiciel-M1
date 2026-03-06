import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { popularProducts } from "../data/products";

function Home() {
  return (
    <div>
      <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video_skate_background.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-(--home-overlay)"
          aria-hidden="true"
        />
        <h1 className="relative z-10 text-4xl font-title uppercase tracking-[0.2em] text-(--color-text-primary) md:text-6xl">
          Welcome to No Comply
        </h1>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-[0.08em]">
            Popular Products
          </h2>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-[0.14em] text-skate-acid"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
