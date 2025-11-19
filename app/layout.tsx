"use client";
import { AuthProvider } from "@/components/context/AuthProvider";
// @ts-ignore - CSS global side-effect import has no type declarations
import "./globals.css";
import Navbar from "@/components/navbar";
import { Footer2 } from "@/components/footer2";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en">
        <body className={`antialiased`}>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer2 />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
