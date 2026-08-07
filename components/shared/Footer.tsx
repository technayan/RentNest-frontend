import Link from "next/link";

export default function Footer() {
  const year = 2026;
  return (
    <div className="text-center py-5 border-t z-50 bg-white">
      Copyright &copy;{year}. All rights reserved to{" "}
      <Link href={"/"} className="hover:underline">
        RentNest
      </Link>
    </div>
  );
}
