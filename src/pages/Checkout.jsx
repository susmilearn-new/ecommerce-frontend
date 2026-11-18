import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/thunks/orderThunks";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.cart.items);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD",
    });

    const [loading, setLoading] = useState(false);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                items: items.map((item) => ({
                    product: item.product,
                    quantity: item.quantity,
                })),

                shippingAddress: `${formData.name}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,

                paymentMethod: formData.paymentMethod,
            };

            await dispatch(createOrder(orderData));

            dispatch(clearCart());

            toast.success("Order placed successfully!");

            navigate("/orders");
        } catch (error) {
            console.error("Order error:", error.response?.data);

            toast.error(
                error.response?.data?.message || "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>

                <button
                    onClick={() => navigate("/")}
                    className="mt-5 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 active:scale-95 transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Shipping Details */}
                <div className="border rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-5">
                        Shipping Details
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="City"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="State"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Pincode"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Payment Method
                            </label>

                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="COD">
                                    Cash on Delivery
                                </option>

                                <option value="Online">
                                    Online Payment
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 active:scale-[0.98] transition disabled:bg-gray-400"
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="border rounded-xl p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-5">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.product}
                                className="flex justify-between gap-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ₹{item.price} × {item.quantity}
                                    </p>
                                </div>

                                <p className="font-semibold">
                                    ₹
                                    {(
                                        item.price * item.quantity
                                    ).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-5 pt-5 flex justify-between">
                        <span className="font-semibold">
                            Total
                        </span>

                        <span className="text-xl font-bold">
                            ₹{total.toFixed(2)}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;