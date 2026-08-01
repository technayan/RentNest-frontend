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
import Logo from "@/public/assets/RentNest-logo.png";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
    role: string;
    profile_photo?: string;
    created_at: string;
    updated_at: string;
  };
};

type NavbarProps = {
  user: IUser;
};

const menuItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "properties", label: "Available Properties", href: "/properties" },
];

const tenantProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/tenant",
  },
];

const authorProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/author",
  },
];

const adminProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/admin",
  },
];

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navHandler = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const userNameInitials = user.data.name
    .toUpperCase()
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  let profileItems = [];

  if (user.data.role === "ADMIN") {
    profileItems = adminProfileItems;
  } else if (user.data.role === "AUTHOR") {
    profileItems = authorProfileItems;
  } else {
    profileItems = tenantProfileItems;
  }

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
              width={150}
              height={35}
              className="h-auto"
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
            {user.success ? (
              <div className="hidden md:flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className={""}>
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.data.profile_photo}
                        alt={user.data.name}
                      />
                      <AvatarFallback>{userNameInitials}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-semibold">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {profileItems.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => navHandler(item.href)}
                        className={"hover:bg-red-100 cursor-pointer"}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={"hover:bg-red-100 cursor-pointer"}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
                <nav className="flex flex-col gap-4 mt-8 p-6">
                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <div
                      onClick={() => navHandler(item.href)}
                      key={item.id}
                      className="text-md font-medium text-foreground/80 transition-colors cursor-pointer hover:text-primary"
                    >
                      {item.label}
                    </div>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    {user.success ? (
                      profileItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => navHandler(item.href)}
                          className="flex items-center cursor-pointer hover:text-primary"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          <span>{item.label}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex gap-1 md:hidden">
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
