import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="text-center py-5 border-t">
      Copyright &copy;{year}. All rights reserved to{" "}
      <Link href={"/"} className="hover:underline">
        RentNest
      </Link>
    </div>
  );
}
