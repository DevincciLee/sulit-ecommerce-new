import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowRight, Badge } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductCard from "./card";

const StorefrontHero1 = () => {
  const featuredProducts = [
    {
      id: "prod_001",
      sku: "WH-XB900N",
      name: "Wireless Noise-Canceling Headphones",
      brand: "Sony",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviewCount: 1247,
      inStock: true,
      isNew: true,
      isOnSale: false,
      image: "https://ui.shadcn.com/placeholder.svg",
      colors: ["#000000", "#1E3A8A", "#991B1B"],
      badge: "Featured",
    },
    {
      id: "prod_002",
      sku: "SWP-2024",
      name: "Smart Watch Pro Series 7",
      brand: "Apple",
      price: 279.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviewCount: 892,
      inStock: true,
      isNew: false,
      isOnSale: true,
      image: "https://ui.shadcn.com/placeholder.svg",
      colors: ["#1F2937", "#F3F4F6", "#F59E0B"],
      badge: "Featured",
    },
  ];

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
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                ratingCount={product.reviewCount}
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
