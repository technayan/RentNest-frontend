"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProperty } from "../landlord/_actions/landlordActions";

export default function DeletePropertyButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProperty(id);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer px-6 py-4 text-destructive bg-destructive/30 hover:bg-destructive hover:text-white"
    >
      {isPending ? "Removing..." : "Remove"}
    </Button>
  );
}
