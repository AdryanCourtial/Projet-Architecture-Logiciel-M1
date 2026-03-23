import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { products } from "../data/products";
import CheckoutConfirmationModal from "../components/CheckoutConfirmationModal";

type CartItem = {
  productId: number;
  quantity: number;
};

type InvoiceLine = {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type Invoice = {
  id: string;
  createdAt: string;
  total: number;
  lines: InvoiceLine[];
};

const INVOICES_STORAGE_KEY = "mockInvoices";

const initialCart: CartItem[] = [
  { productId: 1, quantity: 1 },
  { productId: 4, quantity: 2 },
];

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find(
            (candidate) => candidate.id === item.productId,
          );

          if (!product) {
            return undefined;
          }

          return {
            ...item,
            product,
            lineTotal: item.quantity * product.price,
          };
        })
        .filter(Boolean),
    [items],
  );

  const total = useMemo(
    () => detailedItems.reduce((sum, item) => sum + (item?.lineTotal ?? 0), 0),
    [detailedItems],
  );

  const updateQuantity = (productId: number, nextQuantity: number) => {
    if (nextQuantity < 1) {
      setItems((current) =>
        current.filter((item) => item.productId !== productId),
      );
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );
  };

  const handleStartCheckout = () => {
    setCheckoutMessage(null);
    setIsConfirmOpen(true);
  };

  const handleCancelCheckout = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmCheckout = () => {
    const invoiceLines: InvoiceLine[] = detailedItems
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        productId: item.productId,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        lineTotal: item.lineTotal,
      }));

    if (invoiceLines.length === 0) {
      setIsConfirmOpen(false);
      return;
    }

    const nextInvoice: Invoice = {
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      total,
      lines: invoiceLines,
    };

    try {
      const rawInvoices = localStorage.getItem(INVOICES_STORAGE_KEY);
      const parsed = rawInvoices ? (JSON.parse(rawInvoices) as Invoice[]) : [];
      const nextInvoices = [nextInvoice, ...parsed];
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(nextInvoices));
    } catch {
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify([nextInvoice]));
    }

    setItems([]);
    setCheckoutMessage(
      "Purchase confirmed. Your invoice is now available in Account.",
    );
    setIsConfirmOpen(false);
    navigate("/account");
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Cart
      </h1>

      <div className="mt-8 space-y-4">
        {detailedItems.length === 0 && (
          <p className="border border-white/10 px-4 py-6 text-sm uppercase tracking-widest text-white/60">
            Your cart is empty.
          </p>
        )}

        {detailedItems.map((item) => {
          if (!item) {
            return null;
          }

          return (
            <article
              key={item.productId}
              className="flex flex-col gap-4 border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.08em]">
                  {item.product.name}
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  {item.product.price.toFixed(2)} € / unit
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  className="h-8 w-8 border border-white/30 text-sm font-black transition-all duration-200 ease-out hover:border-acid hover:text-acid"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(
                      item.productId,
                      Number(event.target.value) || 1,
                    )
                  }
                  className="w-16 border border-white/30 bg-transparent px-2 py-1 text-center text-sm font-bold text-textPrimary"
                />
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="h-8 w-8 border border-white/30 text-sm font-black transition-all duration-200 ease-out hover:border-acid hover:text-acid"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-black">
                {item.lineTotal.toFixed(2)} €
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-xl font-black uppercase">
          Total: {total.toFixed(2)} €
        </p>
        <Button
          type="button"
          disabled={detailedItems.length === 0}
          onClick={handleStartCheckout}
        >
          Checkout
        </Button>
      </div>

      {checkoutMessage && (
        <p className="mt-4 border border-acid/40 bg-acid/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-acid">
          {checkoutMessage}
        </p>
      )}

      <CheckoutConfirmationModal
        isOpen={isConfirmOpen}
        total={total}
        itemCount={detailedItems.length}
        onCancel={handleCancelCheckout}
        onConfirm={handleConfirmCheckout}
      />
    </section>
  );
}

export default Cart;
