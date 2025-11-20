"use client";
import { useEffect, useState } from "react";
import ProductCard from "./card";
import { createClient } from "@/utils/supabase/client";

const MAX_ITEMS = 6;

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  badge: string;
};

const ProductCard1 = () => {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("badge", "Featured")
        .limit(MAX_ITEMS);

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      const mapped = data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        slug: p.slug ?? "",
        imageUrl: p.image,
        price: p.price,
        originalPrice: p.original_price,
        badge: p.badge,
      }));

      setProducts(mapped);
    };

    fetchProducts();
  }, [supabase]);

  return (
    <section className="w-full px-8 py-6">
      <h2 className="mb-8 text-center text-2xl font-bold text-balance md:text-3xl">
        Featured Items
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              imageUrl={product.imageUrl}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductCard1;
