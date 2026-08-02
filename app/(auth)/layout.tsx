import NavbarArea from "@/components/shared/NavbarArea";
import { ReactNode, Suspense } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={""}>
        <NavbarArea />
      </Suspense>
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}
