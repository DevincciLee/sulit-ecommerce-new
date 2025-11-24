"use client";
import ProductCard from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAuth from "@/hook/useAuth";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useSearch } from "@/components/context/searchContext";
import { client } from "@/api/client";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  price: number;
  originalPrice: number;
  badge: string;
};

export default function Shop() {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { query = "" } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await client.from("products").select(`
          *
        `);

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      const mapped = data.map((p) => ({
        id: p.id,
        name: p.name,
        imageUrl: p.thumbnail,
        slug: p.slug,
        price: p.price,
        originalPrice: p.original_price,
        badge: p.badge,
      }));

      setProducts(mapped);
    };

    fetchProducts();
  }, [client]);

  const filtered =
    query.trim() === ""
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filtered.slice(startIndex, startIndex + pageSize);

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

  return (
    <div className="mx-auto container w-[90vw] flex flex-col gap-4 justify-center items-center">
      <section className="mt-4 container">
        <Label className="md:text-2xl text-md uppercase font-bold">
          All Products
        </Label>
      </section>

      {/* Product Grid */}
      <section className="container grid md:grid-cols-5 grid-cols-2 gap-4 justify-center items-center">
        {currentProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
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
