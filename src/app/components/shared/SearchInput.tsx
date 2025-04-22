'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        setLoading(true);
        fetch(`/api/products/search?query=${query}`)
          .then((res) => res.json())
          .then(setResults)
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук..."
        className="w-full pl-10 pr-4 py-1.5 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="gray"
        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>

      {/* Dropdown */}
      {query && results.length > 0 && (
        <ul className="absolute z-50 bg-white border w-full mt-1 rounded-xl max-h-[300px] overflow-y-auto shadow-lg">
          {results.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                  setQuery('')
                  router.push(`/catalog/${product.category.url}/${product.productUrl}`)
                }
              }
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <span className="text-sm">{product.name}</span>
              </div>
              <span className="text-red-500 font-semibold text-sm">{product.price} ₴</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
