"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowRight, Badge } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductCard from "./card";
import { client } from "@/api/client";
import { useEffect, useState } from "react";

const StorefrontHero1 = () => {
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

  const MAX_ITEMS = 2;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await client
        .from("products")
        .select("*")
        .eq("badge", "Bestseller")
        .limit(MAX_ITEMS);

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      const mapped = data.map(
        (p: {
          id: any;
          name: any;
          description: any;
          slug: any;
          thumbnail: any;
          price: any;
          original_price: any;
          badge: any;
        }) => ({
          id: p.id,
          name: p.name,
          description: p.description ?? "",
          slug: p.slug,
          imageUrl: p.thumbnail,
          price: p.price,
          originalPrice: p.original_price,
          badge: p.badge,
        })
      );

      setProducts(mapped);
    };

    fetchProducts();
  }, [client]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md mt-4 md:w-full w-[90vw]">
      <div className="lg::py-20 relative z-10 container mx-auto flex flex-col items-center justify-between gap-12 px-4 py-16 lg:px-12 xl:flex-row xl:items-start">
        {/* Left Content */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 xl:text-left">
          <h1 className="text-foreground mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl">
            Shop at SULIT-TECH now and get your{" "}
            <span className="text-green-700">Computer and Printer needs!</span>
          </h1>
          <p className="text-muted-foreground mt-8 text-lg">
            Discover premium quality products designed for you to improve and
            provide service for others!
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start">
            <Link href={"/shop"}>
              <Button
                size="lg"
                className="group relative cursor-pointer overflow-hidden px-8 py-6 hover:bg-green-800 hover:text-white text-base font-medium bg-green-600 text-white"
                variant={"ghost"}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="bg-primary/5 absolute inset-0 -z-0 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Content - Product Showcase */}
        <div className="w-full max-w-2xl lg:mt-0">
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                imageUrl={product.imageUrl}
                price={product.price}
                originalPrice={product.originalPrice}
                badge={product.badge}
              ></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorefrontHero1;
