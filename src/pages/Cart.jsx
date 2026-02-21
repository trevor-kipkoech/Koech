import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-gray-600 mt-2">Start shopping for premium pieces.</p>

        <Link
          to="/shop"
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
        >
          GO TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold tracking-wide mb-8">Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex flex-col sm:flex-row items-center gap-6 bg-white p-5 rounded-xl border shadow-sm"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-gray-900 font-semibold mt-1">
                Ksh {item.price}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.quantity - 1)
                }
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                -
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.quantity + 1)
                }
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id, item.size)}
              className="text-red-600 font-semibold hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-bold">Total: Ksh {totalPrice}</h2>

        <Link
          to="/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </div>
  );
}
