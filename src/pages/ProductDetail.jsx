import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useParams,
} from "react-router-dom";

import {
  fetchProductById,
} from "../redux/thunks/productThunks";

import {
  addToCart,
} from "../redux/slices/cartSlice";

const ProductDetail = () => {
  const {
    id,
  } = useParams();

  const dispatch =
    useDispatch();

  const product =
    useSelector(
      (state) =>
        state.products
          .selectedProduct
    );

  useEffect(() => {
    dispatch(
      fetchProductById(
        id
      )
    );
  }, [
    dispatch,
    id,
  ]);

  if (!product) {
    return (
      <div className="text-center py-10">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          {product.image && (
            <img
              src={
                product.image
              }
              alt={
                product.name
              }
              className="w-full rounded-xl"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {product.category}
          </p>

          <p className="text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="mt-4">
            {product.description}
          </p>

          <p className="mt-3">
            ⭐{" "}
            {product.rating}
          </p>

          <p className="mt-3">
            Stock:{" "}
            {product.stock}
          </p>

          <button
            onClick={() =>
              dispatch(
                addToCart(
                  product
                )
              )
            }
            disabled={
              product.stock ===
              0
            }
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;