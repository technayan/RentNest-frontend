import { Navbar } from "@/components/shared/Navbar";
import { cn } from "@/lib/utils";
import { getMe } from "@/service/getMe";
import { Menu } from "@base-ui/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentNest | Find & List Rental Properties Online",
  description:
    "RentNest is a modern rental property marketplace where landlords list properties, tenants discover homes with advanced search filters, submit rental requests, and make secure online payments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Menu.Group>
          <Navbar user={user} />
        </Menu.Group>
        {children}
      </body>
    </html>
  );
}
