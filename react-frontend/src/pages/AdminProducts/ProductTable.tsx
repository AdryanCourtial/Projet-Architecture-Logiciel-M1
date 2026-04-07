import type { Product } from "../../products/product.types";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => Promise<void>;
  isDeleting?: number | null;
}

function ProductTable({
  products,
  isLoading,
  onEdit,
  onDelete,
  isDeleting = null,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <p className="text-center text-sm uppercase tracking-[0.14em] text-white/60">
        Loading products...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-sm uppercase tracking-[0.14em] text-white/60">
        No products found. Create one to get started!
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em]">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em]">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em]">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em]">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em]">
              Stock
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.12em]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-xs text-white/70">{product.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-white">
                {product.name}
              </td>
              <td className="px-6 py-4 text-xs text-white/70">
                {product.category?.name || "—"}
              </td>
              <td className="px-6 py-4 text-xs text-white/70">
                {product.price.toFixed(2)} €
              </td>
              <td className="px-6 py-4 text-xs text-white/70">
                {product.stock}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-sm border border-white/30 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white hover:border-acid hover:text-acid transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    disabled={isDeleting === product.id}
                    className="rounded-sm border border-red-500/40 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-red-400 hover:border-red-500 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
