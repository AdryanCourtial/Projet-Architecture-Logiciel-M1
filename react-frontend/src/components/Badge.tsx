type BadgeProps = {
  label: string;
};

function Badge({ label }: BadgeProps) {
  const classes =
    label === "NEW"
      ? "bg-acid text-bgPrimary"
      : "bg-cta text-textPrimary";

  return (
    <span
      className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${classes}`}
    >
      {label}
    </span>
  );
}

export default Badge;
