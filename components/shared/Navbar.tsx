"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarProps } from "@/lib/types";
import Logo from "@/public/assets/RentNest-logo.png";
import { logout } from "@/service/logout";
import { getProfileItems } from "@/utils/getProfileItems";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const menuItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "properties", label: "Available Properties", href: "/properties" },
];

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navHandler = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const userNameInitials =
    user?.data?.name
      .toUpperCase()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "";

  const profileItems = getProfileItems(user?.data?.role) || [];

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    toast.success("Logged out successfully.");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navHandler("/")}
            className="flex items-center gap-2 font-bold text-lg cursor-pointer"
          >
            <Image
              src={Logo}
              width={120}
              height={35}
              className="h-auto w-auto"
              alt="RentNest Logo"
            />
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                onClick={() => navHandler(item.href)}
                key={item.id}
                className="text-md font-medium text-foreground/80 transition-colors cursor-pointer hover:text-primary"
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Dropdown - Desktop */}
            {user?.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={"cursor-pointer"}>
                  <Avatar className="size-9">
                    <AvatarImage
                      src={user?.data?.profile_photo}
                      alt={user?.data?.name}
                    />
                    <AvatarFallback>{userNameInitials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="hidden md:block md:w-56"
                >
                  <DropdownMenuLabel className="font-semibold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {profileItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => navHandler(item.href)}
                      className={"cursor-pointer"}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className={"focus:bg-red-100 cursor-pointer"}
                    onClick={() => handleLogout()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex gap-3">
                <Button className="p-0 bg-transparent text-primary border-primary hover:bg-primary hover:text-white overflow-hidden cursor-pointer">
                  <Link href={"/login"} className="block px-4 py-3">
                    Login
                  </Link>
                </Button>
                <Button className="p-0 border-primary hover:bg-transparent hover:text-primary overflow-hidden cursor-pointer">
                  <Link href={"/register"} className="block px-4 py-3">
                    Register
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden">
                {/* <Button variant="ghost" size="icon" className="md:hidden"> */}
                <Menu className="w-5 h-5" />
                {/* </Button> */}
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8 p-6">
                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <div
                      onClick={() => navHandler(item.href)}
                      key={item.id}
                      className="flex items-center p-3 cursor-pointer rounded-xl hover:text-primary hover:bg-accent/50"
                    >
                      {item.label}
                    </div>
                  ))}
                  <div className="border-t border-border py-2">
                    {user?.success ? (
                      <div>
                        {profileItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => navHandler(item.href)}
                            className="flex items-center p-3 mb-2 cursor-pointer rounded-xl hover:text-primary hover:bg-accent/50"
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            <span>{item.label}</span>
                          </div>
                        ))}
                        <hr />
                        <div
                          onClick={handleLogout}
                          className="flex items-center p-3 mt-2 cursor-pointer rounded-xl hover:text-red-500 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Logout</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-1 mt-2 md:hidden">
                        <Button
                          className="px-4 py-3 bg-transparent text-primary border-primary hover:bg-primary hover:text-white overflow-hidden cursor-pointer"
                          onClick={() => navHandler("/login")}
                        >
                          Login
                        </Button>
                        <Button
                          className="px-4 py-3 border-primary hover:bg-transparent hover:text-primary overflow-hidden cursor-pointer"
                          onClick={() => navHandler("/register")}
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
