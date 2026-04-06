import { useEffect, useState } from "react";
import Button from "../components/Button";
import useAuth from "../auth/useAuth";

type AccountData = {
  firstName: string;
  name: string;
  email: string;
  address: string;
  phone: string;
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

const fallbackAccount: AccountData = {
  firstName: "Guest",
  name: "User",
  email: "guest@example.com",
  address: "",
  phone: "",
};

const getContactStorageKey = (email: string) => `accountContact:${email}`;

const loadContactData = (
  email: string,
): Pick<AccountData, "address" | "phone"> => {
  try {
    const rawAccount = localStorage.getItem(getContactStorageKey(email));

    if (rawAccount) {
      return JSON.parse(rawAccount) as Pick<AccountData, "address" | "phone">;
    }
  } catch {
    return { address: "", phone: "" };
  }

  return { address: "", phone: "" };
};

const buildAccountFromUser = (user: {
  firstName: string;
  name: string;
  email: string;
  role: string;
} | null): AccountData => ({
  firstName: user?.firstName ?? fallbackAccount.firstName,
  name: user?.name ?? fallbackAccount.name,
  email: user?.email ?? fallbackAccount.email,
  ...loadContactData(user?.email ?? fallbackAccount.email),
});

function Account() {
  const { user } = useAuth();
  const [account, setAccount] = useState<AccountData>(() =>
    buildAccountFromUser(user),
  );
  const [draft, setDraft] = useState<AccountData>(() =>
    buildAccountFromUser(user),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [invoices] = useState<Invoice[]>(() => {
    try {
      const rawInvoices = localStorage.getItem(INVOICES_STORAGE_KEY);
      return rawInvoices ? (JSON.parse(rawInvoices) as Invoice[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const nextAccount = buildAccountFromUser(user);
    setAccount(nextAccount);
    setDraft(nextAccount);
    setIsEditing(false);
  }, [user?.email, user?.firstName, user?.name]);

  const startEdit = () => {
    setDraft(account);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(account);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setAccount(draft);
    localStorage.setItem(
      getContactStorageKey(draft.email),
      JSON.stringify({ address: draft.address, phone: draft.phone }),
    );
    setIsEditing(false);
  };

  const updateField = (field: keyof AccountData, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const displayedAccount = isEditing ? draft : account;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
          Account
        </h1>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button type="button" variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button type="button" onClick={saveEdit}>
                Save
              </Button>
            </>
          ) : (
            <Button type="button" onClick={startEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 overflow-hidden border border-white/10 bg-black/30">
        <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Firstname
            </p>
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
              {displayedAccount.firstName}
            </p>
          </div>

          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Name
            </p>
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
              {displayedAccount.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/10">
          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Email
            </p>
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
              {displayedAccount.email}
            </p>
          </div>

          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Address
            </p>
            {isEditing ? (
              <input
                type="text"
                value={displayedAccount.address}
                onChange={(event) => updateField("address", event.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />
            ) : (
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
                {displayedAccount.address}
              </p>
            )}
          </div>

          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Phone Number
            </p>
            {isEditing ? (
              <input
                type="tel"
                value={displayedAccount.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />
            ) : (
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
                {displayedAccount.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 border border-white/10 bg-black/30 p-5">
        <h2 className="text-xl font-black uppercase tracking-[0.08em]">
          Invoices
        </h2>

        {invoices.length === 0 ? (
          <p className="mt-4 text-sm text-white/70">No invoice yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {invoices.map((invoice) => (
              <article key={invoice.id} className="border border-white/10 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                    {invoice.id}
                  </p>
                  <p className="text-xs text-white/70">
                    {new Date(invoice.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>

                <div className="mt-3 space-y-2">
                  {invoice.lines.map((line) => (
                    <div
                      key={`${invoice.id}-${line.productId}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <p className="text-textPrimary">
                        {line.name} x{line.quantity}
                      </p>
                      <p className="font-bold text-textPrimary">
                        {line.lineTotal.toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 border-t border-white/10 pt-3 text-sm font-black uppercase text-textPrimary">
                  Total: {invoice.total.toFixed(2)} €
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Account;
