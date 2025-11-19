"use client";
import { Circle, Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { Label } from "./ui/label";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SearchBar from "./searchbar";
import logo from "@/public/logo.png";
import Image from "next/image";
import useAuth from "@/hook/useAuth";
import { redirect, useRouter } from "next/navigation";
import client from "@/api/client";
import { toast } from "sonner";

export default function Navbar() {
  const navLinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Shop",
      link: "/shop",
    },
    {
      id: 3,
      name: "Feedback",
      link: "/feedback",
    },
  ];

  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    return (
      <>
        <nav className="sticky top-0 flex md:justify-evenly justify-between px-4 items-center w-full h-20 bg-green-700 shadow-md text-white z-40">
          {/* Logo And Title */}
          <div className="flex justify-center items-center gap-4 md:w-[15vw]">
            <div>
              <Image src={logo} alt="logo" className="w-10"></Image>
            </div>
            <div>
              <Link href={"/"}>
                <Label className="text-lg lg:text-2xl md:text-xl font-bold uppercase cursor-pointer">
                  sulit-tech
                </Label>
              </Link>
            </div>
          </div>
          {/* Desktop Nav Menu */}
          <div className="hidden w-[70vw] md:flex justify-center items-center gap-4">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={nav.link}
                className="hover:text-gray-700"
              >
                <Label className="text-sm md:text-md lg:text-lg font-semibold uppercase cursor-pointer">
                  {nav.name}
                </Label>
              </Link>
            ))}
          </div>
          {/* Desktop Login Menu */}
          <div className="hidden md:flex justify-center items-center gap-4 w-[15vw]">
            <div className="flex justify-center items-center gap-2">
              <Heart className="cursor-pointer"></Heart>
              <ShoppingCart className="cursor-pointer"></ShoppingCart>
            </div>
            <div>
              <Button
                variant={"default"}
                onClick={() => {
                  setTimeout(() => {
                    toast.info("Signing out... Please wait");
                    redirect("/authentication");
                  }, 2000);
                  client.auth.signOut();
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex justify-center items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 md:hidden size-5 hover:bg-transparent hover:text-white cursor-pointer"
                >
                  <Menu className="size-5"></Menu>
                </Button>
              </SheetTrigger>
              <SheetContent className="h-screen">
                <SheetTitle className="w-full flex pt-7 items-center z-50">
                  <Label className="text-xl uppercase font-bold pl-4">
                    sulit-tech
                  </Label>
                </SheetTitle>
                <SheetDescription>
                  <Label className="w-[80%] pl-4 pt-0 mt-0">
                    Navigate through the website with the links below.
                  </Label>
                </SheetDescription>
                <div className="flex flex-col justify-between h-[80vh]">
                  <div className="w-[80%] flex flex-col justify-center pl-4 gap-4 text-black">
                    {navLinks.map((nav) => (
                      <Link
                        key={nav.id}
                        href={nav.link}
                        className="hover:text-gray-700"
                      >
                        <Label className="text-md font-semibold uppercase cursor-pointer">
                          {nav.name}
                        </Label>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center gap-4 pl-4 mb-4">
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-row gap-2">
                        <Heart className="cursor-pointer"></Heart>
                        <Label>Favorites</Label>
                      </div>
                      <div className="flex flex-row gap-2">
                        <ShoppingCart className="cursor-pointer"></ShoppingCart>
                        <Label>Cart</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button variant={"outline"} onClick={() => {}}>
                    Logout
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        <SearchBar />
      </>
    );
  }

  return (
    <>
      <nav className="sticky top-0 flex md:justify-evenly justify-between px-4 items-center w-full h-20 bg-green-700 shadow-md text-white z-40">
        {/* Logo And Title */}
        <div className="flex justify-center items-center gap-4 md:w-[15vw]">
          <div>
            <Image src={logo} alt="logo" className="w-10"></Image>
          </div>
          <div>
            <Link href={"/"}>
              <Label className="text-lg lg:text-2xl md:text-xl font-bold uppercase cursor-pointer">
                sulit-tech
              </Label>
            </Link>
          </div>
        </div>
        {/* Desktop Nav Menu */}
        <div className="hidden w-[70vw] md:flex justify-center items-center gap-4">
          {navLinks.map((nav) => (
            <Link key={nav.id} href={nav.link} className="hover:text-gray-700">
              <Label className="text-sm md:text-md lg:text-lg font-semibold uppercase cursor-pointer">
                {nav.name}
              </Label>
            </Link>
          ))}
        </div>
        {/* Desktop Login Menu */}
        <div className="hidden md:flex justify-center items-center gap-4 w-[15vw]">
          <div className="flex justify-center items-center gap-2">
            <Heart className="cursor-pointer"></Heart>
            <ShoppingCart className="cursor-pointer"></ShoppingCart>
          </div>
          <div>
            <Button
              variant={"default"}
              onClick={() => {
                router.push("/authentication");
              }}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex justify-center items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 md:hidden size-5 hover:bg-transparent hover:text-white cursor-pointer"
              >
                <Menu className="size-5"></Menu>
              </Button>
            </SheetTrigger>
            <SheetContent className="h-screen">
              <SheetTitle className="w-full flex pt-7 items-center z-50">
                <Label className="text-xl uppercase font-bold pl-4">
                  sulit-tech
                </Label>
              </SheetTitle>
              <SheetDescription>
                <Label className="w-[80%] pl-4 pt-0 mt-0">
                  Navigate through the website with the links below.
                </Label>
              </SheetDescription>
              <div className="flex flex-col justify-between h-[80vh]">
                <div className="w-[80%] flex flex-col justify-center pl-4 gap-4 text-black">
                  {navLinks.map((nav) => (
                    <Link
                      key={nav.id}
                      href={nav.link}
                      className="hover:text-gray-700"
                    >
                      <Label className="text-md font-semibold uppercase cursor-pointer">
                        {nav.name}
                      </Label>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col justify-center gap-4 pl-4 mb-4">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row gap-2">
                      <Heart className="cursor-pointer"></Heart>
                      <Label>Favorites</Label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <ShoppingCart className="cursor-pointer"></ShoppingCart>
                      <Label>Cart</Label>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button
                  variant={"default"}
                  onClick={() => {
                    router.push("/authentication");
                  }}
                >
                  Login
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <SearchBar />
    </>
  );
}
