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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IProperty } from "@/lib/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateProperty } from "../landlord/_actions/landlordActions";

export function PropertyEditDialog({ property }: { property: IProperty }) {
  const categories = [
    { name: "All", value: "" },
    { name: "Apartment", value: "apartment" },
    { name: "Studio", value: "studio" },
    { name: "Flat", value: "flat" },
    { name: "Duplex", value: "duplex" },
    { name: "Condo", value: "condo" },
    { name: "Penthouse", value: "penthouse" },
  ];

  const [open, setOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(property?.title ?? "");
  const [inputDescription, setInputDescription] = useState(
    property?.description ?? "",
  );
  const [inputPropertyImage, setInputPropertyImage] = useState(
    property?.property_image ?? "",
  );
  const [inputPrice, setInputPrice] = useState(property?.price ?? "");
  const [inputLocation, setInputLocation] = useState(property?.location ?? "");
  const [inputCategory, setInputCategory] = useState(
    property?.category?.category_name ?? "",
  );
  const [inputAvailability, setInputAvailability] = useState(
    property.availability_status,
  );
  const [submitted, setSubmitted] = useState(false);
  const initialState = {
    success: false,
    statusCode: 0,
    message: "",
    data: {},
  };
  const [state, action, pending] = useActionState(
    updateProperty.bind(null, property?.id),
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
            className={
              "px-6 py-4 text-primary bg-primary/30 hover:bg-primary hover:text-white cursor-pointer"
            }
          >
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit property</DialogTitle>
          <DialogDescription>
            Make changes to your property here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={(formData) => {
            setSubmitted(true);
            action(formData);
          }}
        >
          <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 py-2">
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  className="py-5"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="py-5"
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="property_image">Property Image</Label>
                <Input
                  id="property_image"
                  name="property_image"
                  className="py-5"
                  value={inputPropertyImage}
                  onChange={(e) => setInputPropertyImage(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  className="py-5"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  className="py-5"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={inputCategory}
                  id="category"
                  name="category"
                  onValueChange={(value) => setInputCategory(value as string)}
                >
                  <SelectTrigger className="w-full py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm">
                    <SelectValue
                      className="capitalize"
                      placeholder="Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.name}
                          value={category.value}
                          className="capitalize"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={inputAvailability}
                  id="availability"
                  name="availability_status"
                  onValueChange={(value) => setInputAvailability(value!)}
                >
                  <SelectTrigger className="w-full py-5 rounded-2xl bg-white border-2 border-primary/30 shadow-sm">
                    <SelectValue
                      className="capitalize"
                      placeholder="Availability"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Availability</SelectLabel>
                      <SelectItem value={"AVAILABLE"} className="capitalize">
                        Available
                      </SelectItem>
                      <SelectItem value={"UNAVAILABLE"} className="capitalize">
                        Unavailable
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose
              render={
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" className="cursor-pointer">
              {pending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
