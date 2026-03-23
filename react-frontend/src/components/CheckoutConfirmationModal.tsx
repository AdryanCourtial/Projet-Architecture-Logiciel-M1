import Button from "./Button";

type CheckoutConfirmationModalProps = {
  isOpen: boolean;
  total: number;
  itemCount: number;
  onCancel: () => void;
  onConfirm: () => void;
};

function CheckoutConfirmationModal({
  isOpen,
  total,
  itemCount,
  onCancel,
  onConfirm,
}: CheckoutConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex min-h-full w-full max-w-190 items-center justify-center">
        <div className="w-full border border-white/15 bg-bgPrimary p-5 shadow-2xl sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-acid">
            Order Validation
          </p>
          <h2 className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-textPrimary sm:text-2xl">
            Confirm Purchase
          </h2>

          <div className="mt-5 space-y-2 border border-white/10 bg-black/30 p-4">
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

          <div className="mt-6 grid grid-cols-1 gap-2 sm:flex sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirmationModal;
