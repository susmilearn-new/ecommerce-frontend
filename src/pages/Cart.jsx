import {useSelector, useDispatch } from "react-redux";

import {removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch =
    useDispatch();

  const items =
    useSelector(
      (state) =>
        state.cart.items
    );

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  if (
    items.length === 0
  ) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">
          Your cart is empty
        </h1>

        <Link
          to="/"
          className="inline-block mt-4 underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="space-y-4">
        {items.map(
          (item) => (
            <div
              key={
                item.product
              }
              className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(
                        item.product
                      )
                    )
                  }
                  className="border px-3 py-1 rounded"
                >
                  -
                </button>

                <span>
                  {
                    item.quantity
                  }
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity(
                        item.product
                      )
                    )
                  }
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              <p className="font-semibold">
                ₹
                {(
                  item.price *
                  item.quantity
                ).toFixed(
                  2
                )}
              </p>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(
                      item.product
                    )
                  )
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">
          Total: ₹
          {total.toFixed(
            2
          )}
        </h2>

        <Link
          to="/checkout"
          className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-lg"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;