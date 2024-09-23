"use client";

import { Input } from "@/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${search}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full pl-10"
        onChange={(event) => setSearch(event.target.value)}
      />
      <SearchIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </form>
  );
}
