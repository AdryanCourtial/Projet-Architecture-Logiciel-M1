import { Link } from "react-router";
import useProductCategories from "../products/useProductCategories";

function Home() {
  const { categories } = useProductCategories();

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

        <img
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src="skate_background.jpg" alt="photo skater" />

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
            Shop by Category
          </h2>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-[0.14em] text-acid"
          >
            Explore Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?categoryId=${category.id}`}
              className="group border border-white/10 bg-black/30 p-5 transition-all duration-200 ease-out hover:border-acid/60 hover:bg-black/40"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-acid/80">
                Category
              </p>
              <h3 className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-textPrimary">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-white/65 line-clamp-2">
                {category.description}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition-colors group-hover:text-acid">
                Browse Products
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
