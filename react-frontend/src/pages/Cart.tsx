import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import CheckoutOrderModal from "../cart/CheckoutOrderModal";
import { getApiErrorMessage } from "../auth/auth.api";
import {
  getBasket,
  removeFromBasket,
  updateBasketQuantity,
} from "../basket/basket.api";
import type { Basket } from "../basket/basket.types";
import { createOrder } from "../orders/order.api";
import type { CreateOrderPayload } from "../orders/order.types";
import { getProductById } from "../products/product.api";

function Cart() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState<Basket | null>(null);
  const [stockByProductId, setStockByProductId] = useState<
    Record<number, number>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderErrorMessage, setOrderErrorMessage] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadBasket = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getBasket();
        setBasket(data);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    void loadBasket();
  }, []);

  useEffect(() => {
    const loadStocks = async () => {
      const productIds = basket?.lines.map((line) => line.productId) ?? [];

      if (productIds.length === 0) {
        setStockByProductId({});
        return;
      }

      try {
        const products = await Promise.all(
          productIds.map(async (productId) => {
            const product = await getProductById(productId);
            return [productId, product.stock] as const;
          }),
        );

        setStockByProductId(Object.fromEntries(products));
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      }
    };

    void loadStocks();
  }, [basket?.lines]);

  const handleUpdateQuantity = async (productId: number, nextQuantity: number) => {
    const maxStock = stockByProductId[productId];
    const clampedQuantity =
      typeof maxStock === "number" ? Math.min(nextQuantity, maxStock) : nextQuantity;

    try {
      setIsUpdating(productId);
      setErrorMessage(null);

      if (clampedQuantity <= 0) {
        const nextBasket = await removeFromBasket(productId);
        setBasket(nextBasket);
        return;
      }

      const nextBasket = await updateBasketQuantity({
        productId,
        quantity: clampedQuantity,
      });
      setBasket(nextBasket);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsUpdating(null);
    }
  };

  const handleStartCheckout = () => {
    setCheckoutMessage(null);
    setOrderErrorMessage(null);
    setIsConfirmOpen(true);
  };

  const handleCancelCheckout = () => {
    setIsConfirmOpen(false);
  };

  const handleCreateOrder = async (payload: CreateOrderPayload) => {
    const currentLines = basket?.lines ?? [];

    if (currentLines.length === 0) {
      setIsConfirmOpen(false);
      return;
    }

    setOrderErrorMessage(null);
    setIsCreatingOrder(true);

    try {
      const createdOrder = await createOrder(payload);

      await Promise.all(currentLines.map((line) => removeFromBasket(line.productId)));
      const refreshedBasket = await getBasket();
      setBasket(refreshedBasket);

      setCheckoutMessage(`Order #${createdOrder.id} created (${createdOrder.status}).`);
      setIsConfirmOpen(false);
      navigate("/account");
    } catch (error) {
      setOrderErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Cart
      </h1>

      {errorMessage && (
        <p className="mt-4 border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
          {errorMessage}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {isLoading && (
          <p className="border border-white/10 px-4 py-6 text-sm uppercase tracking-widest text-white/60">
            Loading basket...
          </p>
        )}

        {!isLoading && (basket?.isEmpty ?? true) && (
          <p className="border border-white/10 px-4 py-6 text-sm uppercase tracking-widest text-white/60">
            Your cart is empty.
          </p>
        )}

        {(basket?.lines ?? []).map((item) => {
          return (
            <article
              key={item.productId}
              className="flex flex-col gap-4 border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.08em]">
                  {item.productName}
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  {item.pricePerUnit.toFixed(2)} € / unit
                </p>
                {typeof stockByProductId[item.productId] === "number" && (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                    Stock available: {stockByProductId[item.productId]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    void handleUpdateQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={isUpdating === item.productId}
                  className="h-8 w-8 border border-white/30 text-sm font-black transition-all duration-200 ease-out hover:border-acid hover:text-acid"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={stockByProductId[item.productId]}
                  value={item.quantity}
                  onChange={(event) =>
                    void handleUpdateQuantity(
                      item.productId,
                      Math.max(0, Number.parseInt(event.target.value, 10) || 0),
                    )
                  }
                  disabled={isUpdating === item.productId}
                  className="w-16 border border-white/30 bg-transparent px-2 py-1 text-center text-sm font-bold text-textPrimary"
                />
                <button
                  onClick={() =>
                    void handleUpdateQuantity(item.productId, item.quantity + 1)
                  }
                  disabled={
                    isUpdating === item.productId ||
                    (typeof stockByProductId[item.productId] === "number" &&
                      item.quantity >= stockByProductId[item.productId])
                  }
                  className="h-8 w-8 border border-white/30 text-sm font-black transition-all duration-200 ease-out hover:border-acid hover:text-acid"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => void handleUpdateQuantity(item.productId, 0)}
                  disabled={isUpdating === item.productId}
                  className="flex h-8 w-8 items-center justify-center border border-red-500/30 transition-all duration-200 ease-out hover:border-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  aria-label={`Remove ${item.productName} from cart`}
                  title="Remove from cart"
                >
                  <img
                    src="/delete-2-svgrepo-com.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 invert"
                  />
                </button>
              </div>

              <p className="text-sm font-black">
                {item.totalPrice.toFixed(2)} €
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-xl font-black uppercase">
          Total: {(basket?.totalPrice ?? 0).toFixed(2)} €
        </p>
        <Button
          type="button"
          disabled={isLoading || (basket?.isEmpty ?? true)}
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

      <CheckoutOrderModal
        isOpen={isConfirmOpen}
        total={basket?.totalPrice ?? 0}
        itemCount={basket?.totalItems ?? 0}
        isSubmitting={isCreatingOrder}
        errorMessage={orderErrorMessage}
        onCancel={handleCancelCheckout}
        onSubmit={handleCreateOrder}
      />
    </section>
  );
}

export default Cart;
