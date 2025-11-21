"use client";
import { AuthProvider } from "@/components/context/AuthProvider";
// @ts-ignore - CSS global side-effect import has no type declarations
import "./globals.css";
import Navbar from "@/components/navbar";
import { Footer2 } from "@/components/footer2";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { SearchProvider } from "@/components/context/searchContext";
import { useAdmin } from "@/hook/isAdmin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { adminCreds } = useAdmin();
  const pathname = usePathname();
  if (pathname.startsWith("/admin") && adminCreds) {
    return (
      <html lang="en">
        <head>
          <title>SULIT-TECH</title>
        </head>
        <body className={`antialiased`}>
          <AuthProvider>
            <main className="flex flex-row">
              <Sidebar />
              {children}
            </main>
          </AuthProvider>
          <Toaster />
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <head>
        <title>SULIT-TECH</title>
      </head>
      <body className={`antialiased`}>
        <AuthProvider>
          <SearchProvider>
            <Navbar />
            {children}
            <Footer2 />
          </SearchProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
