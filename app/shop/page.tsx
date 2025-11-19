"use client";
import ProductCard from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAuth from "@/hook/useAuth";
import Link from "next/link";
import { useState } from "react";

// import shadcn pagination pieces
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function Shop() {
  const products = [
    {
      id: "1",
      name: "Try Product",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 37,
      originalPrice: 128,
      rating: 4, // 0–5
      ratingCount: 17,
      badge: "Sale",
    },
    {
      id: "2",
      name: "Try Product",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 37,
      originalPrice: 128,
      rating: 4, // 0–5
      ratingCount: 17,
      badge: "Sale",
    },
    {
      id: "3",
      name: "Comfy Hoodie",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 52,
      originalPrice: 89,
      rating: 5, // 0–5
      ratingCount: 243,
      badge: "Best Seller",
    },
    {
      id: "4",
      name: "Wireless Earbuds",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 79,
      originalPrice: 149,
      rating: 4, // 0–5
      ratingCount: 512,
      badge: "Sale",
    },
    {
      id: "5",
      name: "Smartwatch Lite",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 120,
      originalPrice: 199,
      rating: 3, // 0–5
      ratingCount: 87,
      badge: "New",
    },
    {
      id: "6",
      name: "Gaming Mouse",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 45,
      originalPrice: 79,
      rating: 4, // 0–5
      ratingCount: 321,
      badge: "Hot",
    },
    {
      id: "7",
      name: "Eco Water Bottle",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 25,
      originalPrice: 40,
      rating: 5, // 0–5
      ratingCount: 156,
      badge: "Trending",
    },
    {
      id: "8",
      name: "Bluetooth Speaker",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 68,
      originalPrice: 120,
      rating: 4, // 0–5
      ratingCount: 402,
      badge: "Sale",
    },
    {
      id: "9",
      name: "Leather Backpack",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 95,
      originalPrice: 160,
      rating: 4,
      ratingCount: 211,
      badge: "Sale",
    },
    {
      id: "10",
      name: "Noise-Canceling Headphones",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 180,
      originalPrice: 299,
      rating: 5,
      ratingCount: 842,
      badge: "Best Seller",
    },
    {
      id: "11",
      name: "Minimalist Desk Lamp",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 40,
      originalPrice: 70,
      rating: 4,
      ratingCount: 134,
      badge: "Trending",
    },
    {
      id: "12",
      name: "Running Shoes",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 89,
      originalPrice: 140,
      rating: 5,
      ratingCount: 512,
      badge: "Hot",
    },
    {
      id: "13",
      name: "Portable Charger",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 35,
      originalPrice: 60,
      rating: 4,
      ratingCount: 276,
      badge: "Sale",
    },
    {
      id: "14",
      name: "Smart Home Bulb",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 22,
      originalPrice: 39,
      rating: 3,
      ratingCount: 98,
      badge: "New",
    },
    {
      id: "15",
      name: "Yoga Mat",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 28,
      originalPrice: 55,
      rating: 5,
      ratingCount: 412,
      badge: "Best Seller",
    },
    {
      id: "16",
      name: "Coffee Grinder",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 65,
      originalPrice: 110,
      rating: 4,
      ratingCount: 203,
      badge: "Sale",
    },
    {
      id: "17",
      name: "Wireless Keyboard",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 58,
      originalPrice: 99,
      rating: 4,
      ratingCount: 187,
      badge: "Hot",
    },
    {
      id: "18",
      name: "Fitness Tracker",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 75,
      originalPrice: 130,
      rating: 4,
      ratingCount: 342,
      badge: "Trending",
    },
    {
      id: "19",
      name: "Scented Candle Set",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 30,
      originalPrice: 50,
      rating: 5,
      ratingCount: 156,
      badge: "New",
    },
    {
      id: "20",
      name: "Laptop Stand",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 42,
      originalPrice: 75,
      rating: 4,
      ratingCount: 289,
      badge: "Sale",
    },
    {
      id: "21",
      name: "Electric Kettle",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 55,
      originalPrice: 95,
      rating: 4,
      ratingCount: 178,
      badge: "Hot",
    },
    {
      id: "22",
      name: "Gaming Chair",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 210,
      originalPrice: 350,
      rating: 5,
      ratingCount: 624,
      badge: "Best Seller",
    },
    {
      id: "23",
      name: "Stylish Sunglasses",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 48,
      originalPrice: 80,
      rating: 4,
      ratingCount: 97,
      badge: "Trending",
    },
    {
      id: "24",
      name: "Wireless Router",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 120,
      originalPrice: 200,
      rating: 3,
      ratingCount: 145,
      badge: "Sale",
    },
    {
      id: "25",
      name: "Digital Camera",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 350,
      originalPrice: 499,
      rating: 5,
      ratingCount: 312,
      badge: "Hot",
    },
    {
      id: "26",
      name: "Travel Suitcase",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 140,
      originalPrice: 220,
      rating: 4,
      ratingCount: 201,
      badge: "Sale",
    },
    {
      id: "27",
      name: "Luxury Watch",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 480,
      originalPrice: 799,
      rating: 5,
      ratingCount: 98,
      badge: "New",
    },
    {
      id: "28",
      name: "Desk Organizer",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 20,
      originalPrice: 35,
      rating: 4,
      ratingCount: 76,
      badge: "Trending",
    },
    {
      id: "29",
      name: "Bluetooth Car Adapter",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 32,
      originalPrice: 55,
      rating: 4,
      ratingCount: 143,
      badge: "Sale",
    },
    {
      id: "30",
      name: "Winter Jacket",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 120,
      originalPrice: 199,
      rating: 5,
      ratingCount: 412,
      badge: "Hot",
    },
    {
      id: "31",
      name: "Smart Thermostat",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 160,
      originalPrice: 250,
      rating: 4,
      ratingCount: 187,
      badge: "Trending",
    },
    {
      id: "32",
      name: "Wireless Charging Pad",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 38,
      originalPrice: 65,
      rating: 4,
      ratingCount: 221,
      badge: "Sale",
    },
    {
      id: "33",
      name: "Kitchen Knife Set",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 85,
      originalPrice: 140,
      rating: 5,
      ratingCount: 312,
      badge: "Best Seller",
    },
    {
      id: "34",
      name: "Office Chair",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 190,
      originalPrice: 320,
      rating: 4,
      ratingCount: 278,
      badge: "Hot",
    },
    {
      id: "35",
      name: "Smartphone Tripod",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 28,
      originalPrice: 50,
      rating: 4,
      ratingCount: 134,
      badge: "Trending",
    },
    {
      id: "36",
      name: "Wireless Gaming Controller",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 65,
      originalPrice: 110,
      rating: 5,
      ratingCount: 289,
      badge: "Sale",
    },
    {
      id: "37",
      name: "Luxury Bed Sheets",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 150,
      originalPrice: 250,
      rating: 5,
      ratingCount: 198,
      badge: "New",
    },
    {
      id: "38",
      name: "Smart Door Lock",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 210,
      originalPrice: 350,
      rating: 4,
      ratingCount: 167,
      badge: "Hot",
    },
    {
      id: "39",
      name: "Wireless Desk Fan",
      imageUrl: "https://ui.shadcn.com/placeholder.svg",
      price: 45,
      originalPrice: 75,
      rating: 3,
      ratingCount: 89,
      badge: "Sale",
    },
  ];

  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // products per page

  const totalPages = Math.ceil(products.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  if (!user) {
    return (
      <div className="container bg-white text-black flex flex-col items-center justify-center gap-4 mt-4">
        <Label>
          Sorry, it seems like you're not logged in. Please login using the link
          below.
        </Label>
        <Link href="/login">
          <Button variant="default">Log in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto container w-[90vw] flex flex-col gap-4 justify-center items-center">
      <section className="mt-4 container">
        <Label className="md:text-2xl text-md uppercase font-bold">
          All Products
        </Label>
      </section>

      {/* Product Grid */}
      <section className="container grid md:grid-cols-5 grid-cols-2 gap-4 justify-center items-center">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            ratingCount={product.ratingCount}
            badge={product.badge}
          />
        ))}
      </section>

      {/* Pagination */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
