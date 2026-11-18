import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  getCurrentUser,
} from "./redux/thunks/authThunks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

const App = () => {
  const dispatch =
    useDispatch();

  useEffect(() => {
    dispatch(
      getCurrentUser()
    );
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/products/:id"
            element={
              <ProductDetail />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </main>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;