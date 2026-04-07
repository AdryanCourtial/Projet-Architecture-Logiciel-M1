import type { OrderAddressPayload } from "../orders/order.types";

type AddressFieldsProps = {
  title: string;
  value: OrderAddressPayload;
  disabled?: boolean;
  onChange: (nextValue: OrderAddressPayload) => void;
};

function AddressFields({
  title,
  value,
  disabled = false,
  onChange,
}: AddressFieldsProps) {
  const updateField = (field: keyof OrderAddressPayload, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="space-y-3 border border-white/10 bg-black/30 p-4">
      <h3 className="text-xs font-black uppercase tracking-[0.12em] text-acid">
        {title}
      </h3>

      <input
        type="text"
        value={value.street}
        onChange={(event) => updateField("street", event.target.value)}
        placeholder="Street"
        required
        disabled={disabled}
        className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid disabled:opacity-50"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={value.city}
          onChange={(event) => updateField("city", event.target.value)}
          placeholder="City"
          required
          disabled={disabled}
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid disabled:opacity-50"
        />
        <input
          type="text"
          value={value.postalCode}
          onChange={(event) => updateField("postalCode", event.target.value)}
          placeholder="Postal code"
          required
          disabled={disabled}
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid disabled:opacity-50"
        />
      </div>

      <input
        type="text"
        value={value.country}
        onChange={(event) => updateField("country", event.target.value)}
        placeholder="Country"
        required
        disabled={disabled}
        className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid disabled:opacity-50"
      />
    </div>
  );
}

export default AddressFields;
