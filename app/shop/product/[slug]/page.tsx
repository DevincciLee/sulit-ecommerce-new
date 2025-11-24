"use client";

import { client } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAuth from "@/hook/useAuth";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  original_price: number;
  badge: string;
  supporting_images: string[];
  description?: string;
};

export default function ProductSlug() {
  const user = useAuth();
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);

  // 👇 Track which image is currently selected
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error: productError } = await client
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (productError) {
        toast.error(`Error fetching the product with the slug of: ${slug}`);
        return;
      }

      setProduct(data);
      setSelectedImage(data?.thumbnail ?? null);
    };

    fetchProduct();
  }, [slug]);

  if (!user) {
    return (
      <div className="mx-auto container bg-white text-black flex flex-col items-center justify-center gap-4 mt-4">
        <Label>
          Sorry, it seems like you're not logged in. Please login using the link
          below.
        </Label>
        <Link href="/authentication">
          <Button variant="default">Log in</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto container flex items-center justify-center h-[50vh]">
        <Label className="text-gray-500">Loading product details...</Label>
      </div>
    );
  }

  const discount =
    product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : null;

  return (
    <div className="mx-auto container w-full h-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Image */}
        <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
          {product.badge && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-green-700">
              ${product.price.toFixed(2)}
            </span>
            {product.original_price > product.price && (
              <>
                <span className="text-lg line-through text-gray-400">
                  ${product.original_price.toFixed(2)}
                </span>
                {discount && (
                  <span className="text-sm text-red-500">-{discount}%</span>
                )}
              </>
            )}
          </div>

          {/* Supporting Images */}
          {product.supporting_images?.length > 0 && (
            <div>
              <Label className="font-semibold">More Images</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[product.thumbnail, ...product.supporting_images].map(
                  (img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 border rounded overflow-hidden focus:outline-none ${
                        selectedImage === img
                          ? "ring-2 ring-green-500"
                          : "hover:border-green-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <Button variant="default">Add to Cart</Button>
            <Button variant="outline">Wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
