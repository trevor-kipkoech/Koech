import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold">{product.name}</h2>
        <p className="text-gray-600">Ksh {product.price}</p>
      </div>
    </Link>
  );
}
