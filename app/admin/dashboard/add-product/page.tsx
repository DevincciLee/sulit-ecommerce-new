"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hook/isAdmin";
import { client } from "@/api/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const { adminCreds } = useAdmin();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const functionToRun = async () => {
    const { data: userData, error } = await client.auth.getUser();

    console.log(userData.user?.role);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // preview uploaded image
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

    let imageUrl: string | null = null;

    // ✅ Upload image to Supabase Storage
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await client.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error(uploadError);
        setError("Image upload failed.");
        return;
      }

      const { data: publicUrlData } = client.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await client.from("products").insert([
      {
        name,
        image: imageUrl,
        slug: slugData,
        price,
        original_price: originalPrice,
        badge,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      setError("Failed to insert product.");
    } else {
      setError("");
      alert("Product added successfully!");
      setImage(null);
    }

    functionToRun();
  };

  if (!adminCreds) {
    return (
      <div className="container mt-2 mx-auto flex flex-col justify-center items-center gap-4">
        <Label>You have no permission to enter this page.</Label>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Return to homepage
        </Button>
      </div>
    );
  } else {
    return (
      <main className="bg-gray-100 container max-w-screen">
        <section>
          <h1 className="mt-4 ml-4 font-bold uppercase">Add Product</h1>
        </section>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            {/* Upload Box */}
            <div className="flex flex-col ml-4 justify-center w-full mt-4 mb-4">
              <label className="md:w-64 md:h-64 w-[40vw] h-[20vh] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-500 transition">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">Click to upload image</span>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  name="image-input"
                />
              </label>
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
}
