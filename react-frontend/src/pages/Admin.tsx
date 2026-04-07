import { Link } from "react-router";
import Button from "../components/Button";
import useAuth from "../auth/useAuth";

function Admin() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-acid">
            Admin only
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
            Admin Dashboard
          </h1>
        </div>

        <div className="text-right text-xs uppercase tracking-[0.14em] text-white/60">
          Connected as {user?.firstName} {user?.name}
        </div>
      </div>

      <div className="mt-8 border border-white/10 bg-black/30 p-6">
        <p className="text-sm text-white/75">
          This route is restricted to users with the ADMIN role. Use it as the
          entry point for admin-only pages, product moderation, or order
          management.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/admin/products">
            <Button type="button">Manage products</Button>
          </Link>
          <Button type="button" variant="secondary">
            Review orders
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Admin;