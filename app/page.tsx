"use client";

import ProductCard1 from "@/components/product-card";
import StorefrontHero1 from "@/components/storefront-hero-1";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="mx-auto container flex flex-col items-center justify-center gap-4 bg-white font-sans overflow-y-scroll">
      <StorefrontHero1 />
      <ProductCard1 />
      <Link href="/shop" className="mb-4">
        <Button
          variant={"ghost"}
          className=" hover:bg-white cursor-pointer"
          onClick={() => {
            router.push("/shop");
          }}
        >
          <Label className="md:text-lg font-bold text-gray-600 underline cursor-pointer">
            See all Products
          </Label>
        </Button>
      </Link>
    </div>
  );
}
