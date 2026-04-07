import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import RequireAuth from "./auth/RequireAuth";
import useAuth from "./auth/useAuth";
import { defaultRoleRoute } from "./auth/AuthProvider";

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth allowedRoles={["ADMIN"]}>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/products"
            element={
              <RequireAuth allowedRoles={["ADMIN"]}>
                <AdminProducts />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated && user ? (
                <Navigate to={defaultRoleRoute(user.role)} replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated && user ? (
                <Navigate to={defaultRoleRoute(user.role)} replace />
              ) : (
                <Register />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
