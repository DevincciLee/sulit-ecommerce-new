import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.toLowerCase()); // always pass query, even if empty
  };

  return (
    <div className="m-auto sticky top-20 z-40 md:w-[50vw] h-12 bg-green-500 flex justify-center items-center shadow-md md:rounded-b-lg lg:rounded-b-lg xl:rounded-b-lg">
      <div className="w-full flex justify-center items-center">
        <Input
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            onSearch(value.toLowerCase()); // 🔑 search on every keystroke
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-white md:w-[35vw] w-[80vw]"
          placeholder="Search products..."
        />
      </div>
    </div>
  );
}
