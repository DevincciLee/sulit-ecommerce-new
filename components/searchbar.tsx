import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div className="m-auto sticky top-20 z-40 md:w-[50vw] h-12 bg-green-500 flex justify-center items-center shadow-md md:rounded-b-lg lg:rounded-b-lg xl:rounded-b-lg">
      <div className="w-full flex justify-center items-center">
        <Input
          className="bg-white md:w-[35vw] w-[80vw]"
          placeholder="Search products..."
        ></Input>
        <Button variant={"ghost"} className="hover:bg-green-500 cursor-pointer">
          <Search className="text-white size-6"></Search>
        </Button>
      </div>
    </div>
  );
}
