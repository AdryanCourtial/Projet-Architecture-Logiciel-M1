import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../components/Button";

type LoginFormData = {
  email: string;
  password: string;
};

type MockUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const MOCK_USER_KEY = "mockUser";
const MOCK_SESSION_KEY = "mockSession";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wasRegistered =
    location.state &&
    typeof location.state === "object" &&
    "registered" in location.state &&
    location.state.registered === true;

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const rawUser = localStorage.getItem(MOCK_USER_KEY);
    const storedUser = rawUser ? (JSON.parse(rawUser) as MockUser) : null;

    if (!storedUser) {
      setErrorMessage("No account found. Please register first.");
      return;
    }

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (email !== storedUser.email || password !== storedUser.password) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      MOCK_SESSION_KEY,
      JSON.stringify({
        loggedIn: true,
        email: storedUser.email,
        firstName: storedUser.firstName,
      }),
    );

    navigate("/account");
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
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </section>
  );
}

export default Login;
