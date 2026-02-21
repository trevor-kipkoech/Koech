import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1. Insert order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            full_name: form.full_name,
            phone: form.phone,
            address: form.address,
            total: totalPrice,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItemsPayload = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsPayload);

      if (itemsError) throw itemsError;

      clearCart();
      setMessage("Order placed successfully 🔥");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Checkout failed. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-wide mb-8">Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">
          Total: <span className="text-black">Ksh {totalPrice}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>

          {message && (
            <p className="text-center text-gray-700 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
