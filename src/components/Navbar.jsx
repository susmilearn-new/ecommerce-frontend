import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logoutUser,
} from "../redux/thunks/authThunks";

const Navbar = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state) =>
      state.auth
  );

  const cartItems =
    useSelector(
      (state) =>
        state.cart.items
    );

  const handleLogout =
    async () => {
      await dispatch(
        logoutUser()
      );

      navigate(
        "/login"
      );
    };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          E-Commerce
        </Link>

        <div className="flex items-center gap-5">
          <Link to="/">
            Home
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/orders">
                Orders
              </Link>

              <Link to="/cart">
                Cart (
                {
                  cartItems.length
                }
                )
              </Link>

              <span>
                Hi,{" "}
                {
                  user?.name
                }
              </span>

              <button
                onClick={
                  handleLogout
                }
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;