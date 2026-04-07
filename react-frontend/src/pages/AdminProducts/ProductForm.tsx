import { useEffect, useState } from "react";
import type { Category, ProductCreatePayload } from "../../products/product.types";

type FormData = ProductCreatePayload & { id?: number };

interface ProductFormProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: FormData;
  categories: Category[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormDataChange: (data: FormData) => void;
  isSubmitting?: boolean;
}

function ProductForm({
  isOpen,
  isEditing,
  formData,
  categories,
  onClose,
  onSubmit,
  onFormDataChange,
  isSubmitting = false,
}: ProductFormProps) {
  const [priceInput, setPriceInput] = useState("");

  const formatCentsToEuroInput = (valueInCents: number): string => {
    if (!Number.isFinite(valueInCents) || valueInCents <= 0) {
      return "";
    }

    const integerValue = Math.round(valueInCents);
    const euros = Math.floor(integerValue / 100);
    const cents = integerValue % 100;

    if (cents === 0) {
      return String(euros);
    }

    return `${euros},${String(cents).padStart(2, "0")}`;
  };

  const parseEuroInputToCents = (normalizedValue: string): number => {
    if (!normalizedValue || normalizedValue === ".") {
      return 0;
    }

    const [eurosPart = "0", centsPart = ""] = normalizedValue.split(".");
    const euros = Number.parseInt(eurosPart || "0", 10);
    const cents = Number.parseInt((centsPart + "00").slice(0, 2), 10);

    if (Number.isNaN(euros) || Number.isNaN(cents)) {
      return 0;
    }

    return euros * 100 + cents;
  };

  const normalizePriceInput = (rawValue: string): string => {
    let sanitized = rawValue.replace(/[^\d.,]/g, "").replace(/,/g, ".");

    const firstDotIndex = sanitized.indexOf(".");
    if (firstDotIndex !== -1) {
      const beforeDot = sanitized.slice(0, firstDotIndex + 1);
      const afterDot = sanitized.slice(firstDotIndex + 1).replace(/\./g, "");
      sanitized = `${beforeDot}${afterDot}`;
    }

    const [eurosPart = "", centsPart = ""] = sanitized.split(".");
    const trimmedCentsPart = centsPart.slice(0, 2);

    return trimmedCentsPart.length > 0
      ? `${eurosPart}.${trimmedCentsPart}`
      : sanitized.endsWith(".")
        ? `${eurosPart}.`
        : eurosPart;
  };

  useEffect(() => {
    setPriceInput(formatCentsToEuroInput(formData.price));
  }, [formData.price, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof FormData, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl border border-acid/50 bg-black p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-acid">
          {isEditing ? "Edit Product" : "Create Product"}
        </h2>

        <form onSubmit={onSubmit} className="mt-10 space-y-8">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-white/80">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              disabled={isSubmitting}
              className="mt-3 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-acid focus:bg-white/5 focus:outline-none transition-all disabled:opacity-50"
              placeholder="e.g., Skateboard Deck"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-white/80">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              disabled={isSubmitting}
              className="mt-3 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-acid focus:bg-white/5 focus:outline-none transition-all resize-none disabled:opacity-50"
              placeholder="Product description"
              rows={5}
            />
          </div>

          {/* Price and Stock Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                Price (€) *
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={priceInput}
                onChange={(e) => {
                    const normalizedValue = normalizePriceInput(e.target.value);
                    setPriceInput(normalizedValue.replace(".", ","));
                    handleChange("price", parseEuroInputToCents(normalizedValue));
                }}
                required
                disabled={isSubmitting}
                className="mt-3 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-acid focus:bg-white/5 focus:outline-none transition-all disabled:opacity-50"
                placeholder="0,00"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                Stock *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value) || 0)
                }
                required
                disabled={isSubmitting}
                className="mt-3 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-acid focus:bg-white/5 focus:outline-none transition-all disabled:opacity-50"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-white/80">
              Category *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                handleChange("categoryId", parseInt(e.target.value))
              }
              required
              disabled={isSubmitting}
              className="mt-3 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-acid focus:bg-white/5 focus:outline-none transition-all cursor-pointer disabled:opacity-50"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-black">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-sm bg-acid px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-bgPrimary hover:bg-acid/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Processing..."
                : isEditing
                  ? "Update Product"
                  : "Create Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-sm border border-white/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-acid hover:text-acid transition-all active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
