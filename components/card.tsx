// components/ProductCard.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating?: number; // 0–5
  ratingCount?: number;
  badge?: string;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
};

export default function ProductCard({
  id,
  name,
  slug,
  imageUrl,
  price,
  originalPrice,
  badge,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    onToggleWishlist?.(id);
  };

  const handleAdd = () => {
    onAddToCart?.(id);
  };

  const badgeColors: Record<string, string> = {
    New: "bg-green-400",
    Featured: "bg-orange-600",
    Bestseller: "bg-red-800",
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-500"
      aria-labelledby={`product-${id}-title`}
    >
      {/* Image */}
      <div className="relative">
        <div className="aspect-4/3 w-full bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* Badge */}
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full ${
              badgeColors[badge] ?? "bg-red-400"
            } px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}
            aria-label={`Badge: ${badge}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3
          id={`product-${id}-title`}
          className="line-clamp-2 md:text-sm text-xs font-semibold text-gray-900"
          title={name}
        >
          {name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-end gap-2">
          <span className="text-base font-bold text-gray-900">
            ₱{price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₱{originalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-xs font-semibold text-rose-600">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add to cart
          </button>
          <a
            href={`/shop/product/${slug}`}
            className="flex justify-center items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={`View details for ${name}`}
          >
            Details
          </a>
        </div>
      </div>
    </article>
  );
}
