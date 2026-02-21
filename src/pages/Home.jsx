import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(4);

      if (!error) setFeatured(data || []);
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-widest">KOECH</h1>
        <p className="mt-4 text-gray-300 text-lg">
          Minimal Streetwear. Maximum Presence.
        </p>

        <div className="mt-8">
          <a
            href="/shop"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            SHOP NOW
          </a>
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold tracking-wide text-gray-900 mb-8">
          Featured Drops
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
