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

function App() {
  const isLoggedIn = (() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const rawSession = localStorage.getItem("mockSession");
      if (!rawSession) {
        return false;
      }

      const session = JSON.parse(rawSession) as { loggedIn?: boolean };
      return session.loggedIn === true;
    } catch {
      return false;
    }
  })();

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account"
            element={
              isLoggedIn ? <Account /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/account" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? <Navigate to="/account" replace /> : <Register />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
