"use client";

import { redirect, useParams } from "next/navigation";
import { client } from "@/api/client";
import { useAdmin } from "@/hook/isAdmin";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  original_price: number;
  badge: string;
};

export default function EditProduct() {
  const { adminCreds } = useAdmin();
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await client
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        toast.error("Error fetching product");
        return;
      }
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("product-name") as string;
    const price = Number(formData.get("product-price"));
    const slugData = name.trim().replace(/\s+/g, "-").toLowerCase();
    const originalPrice = Number(formData.get("product-original-price"));
    const badge = formData.get("product-badge") as string;
    const file = formData.get("image-input") as File | null;

    if (!product) return;

    let imageUrl = product.thumbnail;
    const path = imageUrl?.split("product-images/")[1];

    const { data: imageOldData, error: imageOldError } = await client.storage
      .from("product-images")
      .remove([path]);

    if (imageOldError) {
      console.warn("Did not delete the image..");
      return;
    }

    if (file && file.size > 0) {
      const { data, error } = await client.storage
        .from("product-images")
        .upload(`product-${product.id}-${Date.now()}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        toast.error("Image upload failed");
        return;
      }

      const { data: publicUrlData } = client.storage
        .from("product-images")
        .getPublicUrl(data.path);

      imageUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await client
      .from("products")
      .update({
        name,
        price,
        slug: slugData,
        original_price: originalPrice,
        badge,
        thumbnail: imageUrl, // ✅ use URL, not File
      })
      .eq("id", productId)
      .single();

    if (error) {
      toast.error("Failed to update product");
    } else {
      toast.success("Product updated successfully!");
      redirect("/admin/dashboard/product-list");
    }
  };

  const handleDelete = async () => {
    let imageUrl = product?.thumbnail;
    const path = imageUrl?.split("product-images/")[1];

    if (path) {
      const { data: imageData, error: imageError } = await client.storage
        .from("product-images")
        .remove([path]);

      if (imageError) {
        toast.error("Error deleting image...");
        return;
      }
    }

    const { data, error } = await client
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast.error("Error deleting the product...");
      return;
    }

    toast.success("Deleted successfully!");
    setTimeout(() => {
      redirect("/admin/dashboard/product-list");
    }, 2000);
  };

  if (!adminCreds) {
    return (
      <div className="mx-auto container bg-white text-black flex flex-col items-center justify-center gap-4 mt-4">
        <Label>Sorry, you’re not logged in. Please log in below.</Label>
        <Link href="/authentication">
          <Button variant="default">Log in</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-2xl uppercase font-bold mb-6">Edit Product</h1>

      {product && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-6 rounded-lg w-96 space-y-4"
        >
          <div>
            <Label>Name</Label>
            <Input
              defaultValue={product.name} // ✅ use defaultValue
              name="product-name"
              id="product-name"
            />
          </div>

          <div>
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              name="image-input"
              id="image-input"
            />
          </div>
          <div>
            <Label>Supporting Image 1</Label>
            <Input
              type="file"
              accept="image/*"
              name="image-input1"
              id="image-input"
            />
          </div>
          <div>
            <Label>Supporting Image 2</Label>
            <Input
              type="file"
              accept="image/*"
              name="image-input2"
              id="image-input"
            />
          </div>
          <div>
            <Label>Supporting Image 3</Label>
            <Input
              type="file"
              accept="image/*"
              name="image-input3"
              id="image-input"
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              defaultValue={product.price} // ✅ use defaultValue
              name="product-price"
              id="product-price"
            />
          </div>

          <div>
            <Label>Original Price</Label>
            <Input
              type="number"
              defaultValue={product.original_price} // ✅ use defaultValue
              name="product-original-price"
              id="product-original-price"
            />
          </div>

          <div>
            <Label>Badge</Label>
            <Input
              defaultValue={product.badge} // ✅ use defaultValue
              name="product-badge"
              id="product-badge"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}
