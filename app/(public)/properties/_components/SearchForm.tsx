"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchForm() {
  const categories = [
    { name: "All", value: "" },
    { name: "Apartment", value: "apartment" },
    { name: "Studio", value: "studio" },
    { name: "Flat", value: "flat" },
    { name: "Duplex", value: "duplex" },
    { name: "Condo", value: "condo" },
    { name: "Penthouse", value: "penthouse" },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debouncedReference = useRef<ReturnType<typeof setTimeout>>(null);

  const handleChange = (key: string, value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set(key, value.toLowerCase());
      } else {
        params.delete(key);
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  const category = searchParams.get("category") ?? "";

  return (
    <div className="w-full py-6 grid grid-cols-1 gap-3 border-b sm:grid-cols-2 md:grid-cols-4 md:py-11">
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          onChange={(e) => handleChange("searchTerm", e.target.value)}
          value={
            searchParams.get("searchTerm")
              ? searchParams.get("searchTerm")?.toString()
              : ""
          }
          placeholder="Search property..."
          className="pl-9 py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm"
        />
      </div>
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          onChange={(e) => handleChange("location", e.target.value)}
          value={
            searchParams.get("location")
              ? searchParams.get("location")?.toString()
              : ""
          }
          placeholder="Location..."
          className="pl-9 py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm"
        />
      </div>
      <div className="relative w-full">
        <Select
          onValueChange={(value) => handleChange("category", value as string)}
          value={category}
        >
          <SelectTrigger className="w-full py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm">
            <SelectValue className="capitalize" placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((category) => (
                <SelectItem
                  key={category.name}
                  value={category.value}
                  className="capitalize"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative w-full">
        <Input
          onChange={(e) => handleChange("price", e.target.value)}
          value={
            searchParams.get("price")
              ? searchParams.get("price")?.toString()
              : ""
          }
          placeholder="Max price..."
          className=" py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm"
        />
      </div>
    </div>
  );
}
