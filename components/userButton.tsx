"use client";

import logo from "@/public/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "./ui/button";
import { toast } from "sonner";
import client from "@/api/client";
import { redirect } from "next/navigation";
import { Label } from "./ui/label";
import useAuth from "@/hook/useAuth";
import { Field } from "./ui/field";

export default function UserButton() {
  const user = useAuth();
  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <Avatar>
            <AvatarImage src={""} alt="avatar" className="" />
            <AvatarFallback className="bg-black">CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <Label className="w-full flex justify-center items-center">
            Hi! {user.user?.email}
          </Label>
          <Button variant={"outline"} className="w-full cursor-pointer">
            <Link href={"/profile"}>Edit Profile</Link>
          </Button>
          <Button
            className="w-full cursor-pointer"
            variant={"default"}
            onClick={() => {
              setTimeout(() => {
                toast.info("Signing out... Please wait");
                redirect("/authentication");
              }, 1000);
              client.auth.signOut();
            }}
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
