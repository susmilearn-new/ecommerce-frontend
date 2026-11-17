
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/thunks/authThunks";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await dispatch(registerUser(formData));
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Register to start shopping
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-3 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
