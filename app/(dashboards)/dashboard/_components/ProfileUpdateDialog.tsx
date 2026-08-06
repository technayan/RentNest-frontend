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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/lib/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { handleUpdateProfile } from "../_actions/dashboardActions";

export function ProfileUpdateDialog({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState(user?.name ?? "");
  const [inputPhone, setInputPhone] = useState(user?.phone ?? "");
  const [inputPhoto, setInputPhoto] = useState(user?.profile_photo ?? "");
  const [submitted, setSubmitted] = useState(false);

  const initialState = {
    success: false,
    statusCode: 0,
    message: "",
    data: {},
  };

  const [state, action, pending] = useActionState(
    handleUpdateProfile,
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
            variant="outline"
            className={
              "mt-5 px-4 py-4 border-primary hover:bg-primary hover:text-white cursor-pointer"
            }
          >
            Edit Profile
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="py-5"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                className="py-5"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="profile_photo">Profile Photo</Label>
              <Input
                id="profile_photo"
                name="profile_photo"
                className="py-5"
                value={inputPhoto}
                onChange={(e) => setInputPhoto(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">
              {pending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
