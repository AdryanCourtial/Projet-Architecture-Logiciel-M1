import type { ReactNode } from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "rounded-sm px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] transition-all duration-200 ease-out";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cta text-textPrimary hover:bg-acid hover:text-bgPrimary",
  secondary:
    "border border-textPrimary bg-transparent text-textPrimary hover:border-acid hover:text-acid",
};

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
