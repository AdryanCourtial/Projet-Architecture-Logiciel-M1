import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { getApiErrorMessage } from "../auth/auth.api";
import useAuth from "../auth/useAuth";
import Button from "../components/Button";

type RegisterFormData = {
  firstname: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstname: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (
      !formData.firstname.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const responseMessage = await register({
        firstname: formData.firstname.trim(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      navigate("/login", {
        state: { registered: true, message: responseMessage },
      });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-180 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-[0.08em] sm:text-4xl">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 border border-white/10 bg-black/30 p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
              Firstname
            </span>
            <input
              type="text"
              value={formData.firstname}
              onChange={(event) => updateField("firstname", event.target.value)}
              className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
              Name
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
            />
          </label>
        </div>

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

        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
            Confirm password
          </span>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
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
            to="/login"
            className="text-xs font-bold uppercase tracking-[0.12em] text-acid"
          >
            Already have an account?
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Register;
