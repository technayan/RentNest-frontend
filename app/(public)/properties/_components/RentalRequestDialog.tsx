"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { sendRentalRequest } from "../_actions/propertyActions";

export default function RentalRequestDialog({
  id,
  availability_status,
}: {
  id: string;
  availability_status: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initialState = {
    success: false,
    statusCode: 0,
    message: "",
    data: {},
  };

  const [state, action, pending] = useActionState(
    sendRentalRequest.bind(null, id),
    initialState,
  );

  useEffect(() => {
    if (!submitted) return;
    if (state.success) {
      toast.success(state.message);
      startTransition(() => {
        setOpen(false);
      });
    } else {
      toast.error(state.message);
    }
    startTransition(() => {
      setSubmitted(false);
    });
  }, [state, submitted]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className={`w-full py-6 cursor-pointer text-base   ${
              availability_status === "RENTED"
                ? "bg-gray-300 text-gray-700"
                : availability_status === "UNAVAILABLE"
                  ? "bg-gray-300 text-gray-700"
                  : "bg-primary"
            }`}
            size="lg"
            disabled={
              availability_status === "RENTED" ||
              availability_status === "UNAVAILABLE"
            }
          >
            {availability_status === "RENTED"
              ? "Already Rented"
              : availability_status === "UNAVAILABLE"
                ? "Property Unavailable"
                : "Request for Rent"}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rental Request</DialogTitle>
          <DialogDescription>
            Provide your message here. Click send when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={(formData) => {
            setSubmitted(true);
            action(formData);
          }}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                className="py-5"
                placeholder="Write a message"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose
              render={
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" className="cursor-pointer">
              {pending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
