import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../products/product.api";
import type {
  Product,
  ProductCreatePayload,
  ProductUpdatePayload,
} from "../products/product.types";
import ProductForm from "./AdminProducts/ProductForm";
import ProductTable from "./AdminProducts/ProductTable";
import useAuth from "../auth/useAuth";

function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const [formData, setFormData] = useState<ProductCreatePayload & { id?: number }>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: 1,
  });

  // Load products
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await getProducts(1, 100);
      setProducts(data.data);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to load products"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.category?.id || 1,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: 1,
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 1,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (editingId) {
        const { id, ...updateData } = formData;
        const payload: ProductUpdatePayload = updateData;
        await updateProduct(editingId, payload);
        setSuccessMessage("Product updated successfully!");
      } else {
        const payload: ProductCreatePayload = formData;
        await createProduct(payload);
        setSuccessMessage("Product created successfully!");
      }
      handleCloseForm();
      await loadProducts();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to save product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);
    setIsDeleting(id);

    try {
      await deleteProduct(id);
      setSuccessMessage("Product deleted successfully!");
      await loadProducts();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to delete product"
      );
    } finally {
      setIsDeleting(null);
    }
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase">Access Denied</h1>
        <p className="mt-4 text-sm text-white/60">
          You need admin privileges to access this page.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-350 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black uppercase tracking-[0.08em]">
          Manage Products
        </h1>
        <button
          onClick={() => handleOpenForm()}
          className="rounded-sm bg-acid px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bgPrimary hover:bg-acid/90 transition-all active:scale-95"
        >
          + Add Product
        </button>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-6 border border-green-500/40 bg-green-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-green-300 animate-in fade-in">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-red-300 animate-in fade-in">
          {errorMessage}
        </div>
      )}

      {/* Product Table */}
      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showForm}
        isEditing={editingId !== null}
        formData={formData}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}

export default AdminProducts;
