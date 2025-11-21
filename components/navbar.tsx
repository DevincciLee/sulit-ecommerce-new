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
import { useEffect, useState } from "react";
import { useSearch } from "./context/searchContext";
import UserButton from "./userButton";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  type userInfo = {
    id: string | null;
    full_name: string | null;
    email: string | null;
  };

  const supabase = createClient();
  const { setQuery } = useSearch();
  const [username, setUsername] = useState<userInfo | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const getUserName = async () => {
      if (!user?.id) {
        console.warn("User ID is not available yet");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("id", user.id) // guaranteed to be defined here
        .single();

      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }

      if (!data) {
        console.warn("No profile found for user:", user.id);
        return;
      }

      setUsername(data);
    };

    getUserName();
  }, [supabase, user]);

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
              <Button
                variant={"ghost"}
                className="hover:bg-green-700 text-white hover:text-white cursor-pointer"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <Search className="size-5.5" />
              </Button>
              <ShoppingCart className="cursor-pointer"></ShoppingCart>
            </div>
            <div>
              <UserButton />
            </div>
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex h-full justify-center items-center">
            <Button
              variant={"ghost"}
              className="hover:bg-green-700 text-white hover:text-white cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              <Search />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 md:hidden size-5 hover:bg-transparent hover:text-white cursor-pointer"
                >
                  <Menu className="size-5"></Menu>
                </Button>
              </SheetTrigger>
              <SheetContent className="h-full">
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
                <SheetFooter className="flex flex-row">
                  <UserButton />
                  {username && (
                    <div key={username.id} className="flex flex-col gap-2">
                      <Label>{username.full_name}</Label>
                      <Label className="text-gray-400 overflox-x-hidden">
                        {username.email}
                      </Label>
                    </div>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        {showSearch && <SearchBar onSearch={setQuery} />}
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
            <Button
              variant={"ghost"}
              className="hover:bg-green-700 text-white hover:text-white cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              <Search />
            </Button>
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
          <Button
            variant={"ghost"}
            className="hover:bg-green-700 text-white hover:text-white cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <Search />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 md:hidden size-5 hover:bg-transparent hover:text-white cursor-pointer"
              >
                <Menu className="size-5"></Menu>
              </Button>
            </SheetTrigger>
            <SheetContent className="h-full">
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
      {showSearch && <SearchBar onSearch={setQuery} />}
    </>
  );
}
