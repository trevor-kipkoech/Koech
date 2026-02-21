import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-widest">
        KOECH
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium">
        <NavLink to="/shop" className="hover:text-gray-300 transition">
          SHOP
        </NavLink>

        <NavLink to="/cart" className="hover:text-gray-300 transition">
          CART ({cartCount})
        </NavLink>

        {user ? (
          <button
            onClick={handleLogout}
            className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
          >
            LOGOUT
          </button>
        ) : (
          <NavLink
            to="/login"
            className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
          >
            LOGIN
          </NavLink>
        )}
      </div>
    </nav>
  );
}
