import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { defaultRoleRoute } from "../auth/AuthProvider";
import { getApiErrorMessage } from "../auth/auth.api";
import useAuth from "../auth/useAuth";
import Button from "../components/Button";

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasRegistered =
    location.state &&
    typeof location.state === "object" &&
    "registered" in location.state &&
    location.state.registered === true;

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      navigate(defaultRoleRoute(user.role), { replace: true });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-180 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 border border-white/10 bg-black/30 p-5"
      >
        {wasRegistered && (
          <p className="border border-acid/40 bg-acid/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-acid">
            Account created. You can now sign in.
          </p>
        )}

        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
            Email
          </span>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
            Password
          </span>
          <input
            type="password"
            value={formData.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
          />
        </label>

        {errorMessage && (
          <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            to="/register"
            className="text-xs font-bold uppercase tracking-[0.12em] text-acid"
          >
            Create an account
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Login;
