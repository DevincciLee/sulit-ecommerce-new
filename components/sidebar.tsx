"use client";

import { useState } from "react";
import { PlusCircle, List, ShoppingCart } from "lucide-react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } top-0 left-0 bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 shadow-md z-50`}
    >
      {/* Title */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">
          {isOpen ? (
            <Link href={"/admin/dashboard"}>SULIT-TECH Admin Dashboard</Link>
          ) : (
            <Link href={"/admin/dashboard"} className="flex justify-center">
              <Image src={logo} alt={"logo"} className="size-10"></Image>
            </Link>
          )}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin/dashboard/add-product"
          className={
            !isOpen
              ? `flex items-center justify-center gap-2 p-2 rounded hover:bg-green-700 transition`
              : `flex items-center gap-2 p-2 rounded hover:bg-green-700 transition`
          }
        >
          <PlusCircle size={20} />
          {isOpen && <span>Add Product</span>}
        </Link>

        <Link
          href="/admin/dashboard/product-list"
          className={
            !isOpen
              ? `flex items-center justify-center gap-2 p-2 rounded hover:bg-green-700 transition`
              : `flex items-center gap-2 p-2 rounded hover:bg-green-700 transition`
          }
        >
          <List size={20} />
          {isOpen && <span>Product List</span>}
        </Link>

        <Link
          href="admin/dashboard/orders"
          className={
            !isOpen
              ? `flex items-center justify-center gap-2 p-2 rounded hover:bg-green-700 transition`
              : `flex items-center gap-2 p-2 rounded hover:bg-green-700 transition`
          }
        >
          <ShoppingCart size={20} />
          {isOpen && <span>Orders</span>}
        </Link>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 hover:bg-gray-700 transition"
      >
        {isOpen ? "<" : ">"}
      </button>
    </aside>
  );
}
