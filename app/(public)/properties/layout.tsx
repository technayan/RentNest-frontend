import NavbarArea from "@/components/shared/NavbarArea";
import { ReactNode, Suspense } from "react";

export default async function PropertiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={""}>
        <NavbarArea />
      </Suspense>
      {children}
    </div>
  );
}
