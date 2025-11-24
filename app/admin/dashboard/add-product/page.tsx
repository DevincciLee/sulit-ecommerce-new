"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hook/isAdmin";
import { client } from "@/api/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const { adminCreds } = useAdmin();
  const router = useRouter();

  // ✅ Separate states for each image
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [supporting1, setSupporting1] = useState<string | null>(null);
  const [supporting2, setSupporting2] = useState<string | null>(null);
  const [supporting3, setSupporting3] = useState<string | null>(null);

  const [error, setError] = useState("");

  // ✅ Generic handler for previews
  const handlePreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("product-name") as string;
    const price = Number(formData.get("product-price"));
    const slugData =
      typeof name === "string"
        ? name.trim().replaceAll(/\s+/g, "-").toLowerCase()
        : "";
    const originalPrice = Number(formData.get("product-original-price"));
    const badge = formData.get("product-badge") as string;

    const file = (formData.get("image-input") as File) || null;
    const file1 = (formData.get("image-input1") as File) || null;
    const file2 = (formData.get("image-input2") as File) || null;
    const file3 = (formData.get("image-input3") as File) || null;

    let imageUrl: string | null = null;
    let imageUrl1: string | null = null;
    let imageUrl2: string | null = null;
    let imageUrl3: string | null = null;

    // ✅ Upload helper
    const uploadImage = async (file: File | null) => {
      if (!file) return null;
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await client.storage
        .from("product-images")
        .upload(fileName, file);
      if (uploadError) {
        console.error(uploadError);
        setError("Image upload failed.");
        return null;
      }
      const { data: publicUrlData } = client.storage
        .from("product-images")
        .getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    };

    imageUrl = await uploadImage(file);
    imageUrl1 = await uploadImage(file1);
    imageUrl2 = await uploadImage(file2);
    imageUrl3 = await uploadImage(file3);

    const { error: insertError } = await client.from("products").insert([
      {
        name,
        thumbnail: imageUrl,
        slug: slugData,
        price,
        original_price: originalPrice,
        badge,
        supporting_images: [imageUrl1, imageUrl2, imageUrl3],
      },
    ]);

    if (insertError) {
      console.error(insertError);
      setError("Failed to insert product.");
    } else {
      setError("");
      alert("Product added successfully!");
      setThumbnail(null);
      setSupporting1(null);
      setSupporting2(null);
      setSupporting3(null);
      redirect("/admin/dashboard/product-list");
    }
  };

  if (!adminCreds) {
    return (
      <div className="container mt-2 mx-auto flex flex-col justify-center items-center gap-4">
        <Label>You have no permission to enter this page.</Label>
        <Button onClick={() => router.push("/")}>Return to homepage</Button>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 container max-w-screen">
      <section>
        <h1 className="mt-4 ml-4 font-bold uppercase">Add Product</h1>
      </section>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          {/* Thumbnail */}
          <div className="flex flex-col ml-4 mt-4 mb-4">
            <label className="font-bold">Thumbnail</label>
            <label className="md:w-64 md:h-64 w-[40vw] h-[20vh] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-500 transition">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handlePreview(e, setThumbnail)}
                className="hidden"
                name="image-input"
              />
            </label>
          </div>

          {/* Supporting images */}
          <label className="font-bold ml-4">Supporting images</label>
          <div className="flex flex-row gap-2 ml-4">
            {[supporting1, supporting2, supporting3].map((img, idx) => (
              <label
                key={idx}
                className="md:w-32 md:h-32 w-[20vw] h-[10vh] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-500 transition"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Supporting preview ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">Click to upload image</span>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handlePreview(
                      e,
                      [setSupporting1, setSupporting2, setSupporting3][idx]
                    )
                  }
                  className="hidden"
                  name={`image-input${idx + 1}`}
                />
              </label>
            ))}
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-2 ml-4 mb-2">
            <Label htmlFor="product-name" className="font-semi-bolg text-md">
              Item Name:
            </Label>
            <Input
              type="text"
              name="product-name"
              id="product-name"
              className="md:w-[30vw] w-[60vw]"
              required
            />
          </div>
          {/* Product price */}
          <div className="flex flex-col gap-2 ml-4">
            <Label htmlFor="product-price" className="font-semi-bolg text-md">
              Item Price:
            </Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              name="product-price"
              id="product-price"
              className="md:w-[30vw] w-[60vw]"
              required
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Enter",
                  ".",
                ];
                if (!/^[0-9.]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                  setError(
                    "Only numbers and decimals are allowed in this field."
                  );
                } else {
                  setError("");
                }
              }}
            />
            {error && (
              <Label className="text-red-500 text-sm mt-2">{error}</Label>
            )}
          </div>

          {/* Product Original Price */}
          <div className="flex flex-col gap-2 ml-4 mt-2">
            <Label
              htmlFor="product-original-price"
              className="font-semi-bolg text-md"
            >
              Original Price:
            </Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              name="product-original-price"
              id="product-original-price"
              className="md:w-[30vw] w-[60vw]"
              required
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Enter",
                  ".",
                ];

                if (!/^[0-9.]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                  setError(
                    "Only numbers and decimals are allowed in this field."
                  );
                } else {
                  setError("");
                }
              }}
            />
            {error && (
              <Label className="text-red-500 text-sm mt-2">{error}</Label>
            )}
          </div>

          {/* Product Badge */}
          <div className="flex flex-col gap-2 ml-4 mb-2 mt-2">
            <Label htmlFor="product-badge" className="font-semi-bolg text-md">
              Badge:
            </Label>
            <select
              id="product-badge"
              name="product-badge"
              className="md:w-[30vw] w-[60vw] h-9 bg-transparent rounded-md border border-gray-200 shadow pl-2"
            >
              <option value={"New"} className="">
                New
              </option>
              <option value={"Featured"} className="">
                Featured
              </option>
              <option value={"Bestseller"} className="">
                Bestseller
              </option>
            </select>
          </div>
          <Button
            type="submit"
            variant={"default"}
            className="w-[30vw] ml-4 mt-2"
          >
            Add Product
          </Button>
        </div>
      </form>
    </main>
  );
}
