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
import { LogOut, Menu, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

// "success": true,
//     "statusCode": 200,
//     "message": "User retrived successfully.",
//     "data": {
//         "id": "2e9ce553-136f-4e14-ae79-5c81fb9c8d22",
//         "name": "Abdur Rahim",
//         "email": "rahim@mail.com",
//         "phone": "01234567810",
//         "status": "ACTIVE",
//         "role": "TENANT",
//         "profile_photo": "rahim_profile.com",
//         "created_at": "2026-07-09T13:54:27.283Z",
//         "updated_at": "2026-07-16T12:14:56.822Z"
//     }

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

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "properties", label: "Available Properties", href: "/properties" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Image src={Logo} width={150} height={35} alt="RentNest Logo" />
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-md font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Dropdown - Desktop */}
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-9">
                    <AvatarImage src="/user-avatar.png" alt="User avatar" />
                    <AvatarFallback>{"JD"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-semibold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
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
                <nav className="flex flex-col gap-4 mt-8 p-6">
                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    {user.success ? (
                      <div>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 text-base font-medium text-foreground/80 w-full py-2 hover:text-foreground transition-colors"
                        >
                          <User className="w-5 h-5" />
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 text-base font-medium text-foreground/80 w-full py-2 hover:text-foreground transition-colors"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 text-base font-medium text-foreground/80 w-full py-2 hover:text-foreground transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
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
