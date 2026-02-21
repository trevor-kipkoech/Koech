import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-wide">{product.name}</h1>
        <p className="text-gray-600 mt-2 text-lg">Ksh {product.price}</p>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {product.description || "Premium streetwear made for bold presence."}
        </p>

        <div className="mt-8">
          <p className="font-semibold text-gray-900 mb-2">Select Size</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded border transition ${
                  size === s
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, size)}
          className="mt-10 w-full bg-black text-white py-4 rounded-lg font-semibold tracking-wide hover:bg-gray-900 transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
