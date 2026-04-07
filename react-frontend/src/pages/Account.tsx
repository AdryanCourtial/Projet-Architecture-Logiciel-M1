import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getApiErrorMessage, updateCurrentUser } from "../auth/auth.api";
import useAuth from "../auth/useAuth";
import { getUserOrders } from "../orders/order.api";
import type { UserOrder } from "../orders/order.types";

type AccountData = {
  firstName: string;
  name: string;
  email: string;
  phone: string;
};

const fallbackAccount: AccountData = {
  firstName: "Guest",
  name: "User",
  email: "guest@example.com",
  phone: "",
};

const buildAccountFromUser = (user: {
  firstName: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
} | null, fallbackPhone: string = fallbackAccount.phone): AccountData => ({
  firstName: user?.firstName ?? fallbackAccount.firstName,
  name: user?.name ?? fallbackAccount.name,
  email: user?.email ?? fallbackAccount.email,
  phone: user?.phone ?? fallbackPhone,
});

function Account() {
  const { user, refreshUser } = useAuth();
  const [account, setAccount] = useState<AccountData>(() =>
    buildAccountFromUser(user),
  );
  const [draft, setDraft] = useState<AccountData>(() =>
    buildAccountFromUser(user),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileErrorMessage, setProfileErrorMessage] = useState<string | null>(null);
  const [profileSuccessMessage, setProfileSuccessMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersErrorMessage, setOrdersErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const nextAccount = buildAccountFromUser(user, account.phone);
    setAccount(nextAccount);
    setDraft(nextAccount);
    setIsEditing(false);
  }, [user?.email, user?.firstName, user?.name, user?.phone]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoadingOrders(true);
        setOrdersErrorMessage(null);
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        setOrdersErrorMessage(getApiErrorMessage(error));
        setOrders([]);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    void loadOrders();
  }, []);

  const startEdit = () => {
    setProfileErrorMessage(null);
    setProfileSuccessMessage(null);
    setDraft(account);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setProfileErrorMessage(null);
    setDraft(account);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    try {
      setIsSaving(true);
      setProfileErrorMessage(null);
      setProfileSuccessMessage(null);

      const nextEmail = draft.email.trim();
      const nextFirstName = draft.firstName.trim();
      const nextName = draft.name.trim();
      const nextPhone = draft.phone.trim();

      const payload = {
        ...(nextEmail !== account.email ? { email: nextEmail } : {}),
        ...(nextFirstName !== account.firstName
          ? { firstname: nextFirstName }
          : {}),
        ...(nextName !== account.name ? { name: nextName } : {}),
        ...(nextPhone !== account.phone ? { phone: nextPhone } : {}),
      };

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        setProfileSuccessMessage("No changes to save.");
        return;
      }

      await updateCurrentUser(payload);

      const refreshedUser = await refreshUser();
      const nextAccount = buildAccountFromUser(refreshedUser, nextPhone);
      setAccount(nextAccount);
      setDraft(nextAccount);
      setIsEditing(false);
      setProfileSuccessMessage("Account updated successfully.");
    } catch (error) {
      setProfileErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
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
              <Button type="button" onClick={() => void saveEdit()} disabled={isSaving}>
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

      {profileErrorMessage && (
        <p className="mt-6 border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
          {profileErrorMessage}
        </p>
      )}

      {profileSuccessMessage && (
        <p className="mt-6 border border-green-500/40 bg-green-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-green-300">
          {profileSuccessMessage}
        </p>
      )}

      <div className="mt-8 overflow-hidden border border-white/10 bg-black/30">
        <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Firstname
            </p>
            {isEditing ? (
              <input
                type="text"
                value={displayedAccount.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />
            ) : (
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
                {displayedAccount.firstName}
              </p>
            )}
          </div>

          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Name
            </p>
            {isEditing ? (
              <input
                type="text"
                value={displayedAccount.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />
            ) : (
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
                {displayedAccount.name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/10">
          <div className="space-y-1 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
              Email
            </p>
            {isEditing ? (
              <input
                type="email"
                value={displayedAccount.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />
            ) : (
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-textPrimary">
                {displayedAccount.email}
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
          Orders
        </h2>

        {ordersErrorMessage && (
          <p className="mt-4 border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
            {ordersErrorMessage}
          </p>
        )}

        {isLoadingOrders ? (
          <p className="mt-4 text-sm text-white/70">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-white/70">No invoice yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="border border-white/10 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                    Order #{order.id} - {order.status}
                  </p>
                  <p className="text-xs text-white/70">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>

                <div className="mt-3 space-y-2">
                  {order.lines.map((line) => (
                    <div
                      key={`${order.id}-${line.productId}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <p className="text-textPrimary">
                        {line.productName} x{line.quantity}
                      </p>
                      <p className="font-bold text-textPrimary">
                        {line.lineTotal.toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 border-t border-white/10 pt-3 text-sm font-black uppercase text-textPrimary">
                  Total: {order.total.toFixed(2)} €
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
