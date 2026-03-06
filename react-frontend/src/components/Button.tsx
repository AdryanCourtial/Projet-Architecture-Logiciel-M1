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
    "bg-skate-cta text-skate-text hover:bg-skate-acid hover:text-skate-bg",
  secondary:
    "border border-skate-text bg-transparent text-skate-text hover:border-skate-acid hover:text-skate-acid",
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
