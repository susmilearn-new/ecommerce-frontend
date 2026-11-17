
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>

        {product.brand && (
          <p className="text-sm text-gray-500">{product.brand}</p>
        )}

        <p className="mt-2 font-bold">₹{product.price}</p>

        <p className="text-sm mt-1">⭐ {product.rating}</p>

        <p className={`text-sm mt-2 ${
          isOutOfStock ? "text-red-500" : "text-green-600"
        }`}>
          {isOutOfStock ? "Out of stock" : `${product.stock} available`}
        </p>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/products/${product._id}`}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-center hover:bg-gray-100 active:scale-95 transition-all duration-200"
          >
            View
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-black text-white rounded-lg px-3 py-2 text-sm hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
