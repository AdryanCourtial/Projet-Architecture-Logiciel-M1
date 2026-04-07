import { useEffect, useState } from "react";
import Button from "../components/Button";
import type { CreateOrderPayload, OrderAddressPayload } from "../orders/order.types";
import AddressFields from "./AddressFields";

type CheckoutOrderModalProps = {
  isOpen: boolean;
  total: number;
  itemCount: number;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onCancel: () => void;
  onSubmit: (payload: CreateOrderPayload) => Promise<void>;
};

const emptyAddress: OrderAddressPayload = {
  street: "",
  city: "",
  postalCode: "",
  country: "",
};

function CheckoutOrderModal({
  isOpen,
  total,
  itemCount,
  isSubmitting = false,
  errorMessage = null,
  onCancel,
  onSubmit,
}: CheckoutOrderModalProps) {
  const [deliveryAddress, setDeliveryAddress] = useState<OrderAddressPayload>(emptyAddress);
  const [billingAddress, setBillingAddress] = useState<OrderAddressPayload>(emptyAddress);

  useEffect(() => {
    if (!isOpen) {
      setDeliveryAddress(emptyAddress);
      setBillingAddress(emptyAddress);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      deliveryAddress,
      billingAddress,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex min-h-full w-full max-w-280 items-center justify-center">
        <div className="w-full border border-white/15 bg-bgPrimary p-5 shadow-2xl sm:p-7 lg:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-acid">
            Order Validation
          </p>
          <h2 className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-textPrimary sm:text-2xl">
            Confirm Purchase
          </h2>

          <div className="mt-4 space-y-2 border border-white/10 bg-black/30 p-4">
            <p className="flex items-center justify-between text-sm text-white/80">
              <span>Items</span>
              <span className="font-bold text-textPrimary">{itemCount}</span>
            </p>
            <p className="flex items-center justify-between text-sm text-white/80">
              <span>Total</span>
              <span className="font-black text-textPrimary">
                {total.toFixed(2)} EUR
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
              <AddressFields
                title="Delivery Address"
                value={deliveryAddress}
                onChange={setDeliveryAddress}
                disabled={isSubmitting}
              />

              <AddressFields
                title="Billing Address"
                value={billingAddress}
                onChange={setBillingAddress}
                disabled={isSubmitting}
              />
            </div>

            {errorMessage && (
              <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
                {errorMessage}
              </p>
            )}

            <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutOrderModal;
