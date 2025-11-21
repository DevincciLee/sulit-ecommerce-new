"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hook/isAdmin";
import router from "next/router";

export default function ProductList() {
  const { adminCreds } = useAdmin();
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
  }

  return (
    <main className="bg-gray-100 container max-w-screen">
      <header>
        <h1 className="font-bold pl-4 pt-4 text-xl">Product List</h1>
      </header>
      <section className="mt-4">
        <header>
          <h2 className="font-bold pl-4">All Products</h2>
        </header>
      </section>
    </main>
  );
}
