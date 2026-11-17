import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { loginUser } from "../redux/thunks/authThunks";

const Login = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    loading,
    error,
  } = useSelector(
    (state) =>
      state.auth
  );

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(loginUser(formData));
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-black text-white rounded-lg py-2"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;