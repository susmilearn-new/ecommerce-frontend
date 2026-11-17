import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchMyOrders,
} from "../redux/thunks/orderThunks";

const Orders = () => {
  const dispatch =
    useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state) =>
      state.orders
  );

  useEffect(() => {
    dispatch(
      fetchMyOrders()
    );
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length ===
      0 ? (
        <p>
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map(
            (order) => (
              <div
                key={
                  order._id
                }
                className="border rounded-xl p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      Order #
                      {
                        order._id
                      }
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      }
                    </p>
                  </div>

                  <span className="font-semibold">
                    {
                      order.status
                    }
                  </span>
                </div>

                <div className="mt-4">
                  {order.items.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="flex justify-between py-2"
                      >
                        <span>
                          {
                            item.name
                          }{" "}
                          ×{" "}
                          {
                            item.quantity
                          }
                        </span>

                        <span>
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="border-t mt-3 pt-3 text-right font-bold">
                  Total: ₹
                  {
                    order.totalAmount
                  }
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;