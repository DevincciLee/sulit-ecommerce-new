"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hook/isAdmin";
import useAuth from "@/hook/useAuth";
import { redirect, useRouter } from "next/navigation";

export default function AdminPage() {
  const { adminCreds } = useAdmin();
  const router = useRouter();
  console.log(adminCreds);
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
    setTimeout(() => {
      redirect("/admin/dashboard");
    }, 3000);
    return (
      <div className="mx-auto container flex justify-center items-center mt-4">
        <div className="w-full flex justify-center items-center">
          <Label>
            Permission granted. redirecting you to the dashboard now...
          </Label>
        </div>
      </div>
    );
  }
}
