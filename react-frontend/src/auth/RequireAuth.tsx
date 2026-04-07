import type { ReactNode } from "react";
import { Navigate } from "react-router";
import type { UserRole } from "./auth.types";
import useAuth from "./useAuth";

type RequireAuthProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center px-4 py-12 text-sm uppercase tracking-[0.14em] text-white/60">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/account" replace />;
  }

  return children;
}

export default RequireAuth;