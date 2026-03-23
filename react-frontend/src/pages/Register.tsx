import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type MockUser = RegisterFormData;

const MOCK_USER_KEY = "mockUser";
const MOCK_ACCOUNT_KEY = "mockAccountProfile";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    const userToSave: MockUser = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userToSave));
    localStorage.setItem(
      MOCK_ACCOUNT_KEY,
      JSON.stringify({
        firstName: userToSave.firstName,
        lastName: userToSave.lastName,
        email: userToSave.email,
        address: "",
        phone: "",
      }),
    );

    navigate("/login", {
      state: { registered: true },
    });
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
              First Name
            </span>
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
              Last Name
            </span>
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
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
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </section>
  );
}

export default Register;
