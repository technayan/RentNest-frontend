import Link from "next/link";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="text-center w-full py-5 border-t z-50 bg-white">
      <p className="text-cener px-2 block">
        Copyright &copy;{year}. All rights reserved to{" "}
        <Link href={"/"} className="hover:underline">
          RentNest
        </Link>
      </p>
    </footer>
  );
}
