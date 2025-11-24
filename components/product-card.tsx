"use client";
import { useEffect, useState } from "react";
import ProductCard from "./card";
import { useSearch } from "./context/searchContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { client } from "@/api/client";

const pageSize = 6;

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
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { query = "" } = useSearch();
  const filtered =
    query.trim() === ""
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await client
        .from("products")
        .select("*")
        .eq("badge", "Featured");
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      const mapped = data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        slug: p.slug ?? "",
        imageUrl: p.thumbnail,
        price: p.price,
        originalPrice: p.original_price,
        badge: p.badge,
      }));

      setProducts(mapped);
    };

    fetchProducts();
  }, [client]);

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
    </section>
  );
};

export default ProductCard1;
