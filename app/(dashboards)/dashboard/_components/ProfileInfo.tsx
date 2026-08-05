import { NavbarProps } from "@/lib/types";
import { getNameInitials } from "@/service/getNameInitials";
import Image from "next/image";
import DashboarTitle from "./DashboarTitle";
import { ProfileUpdateDialog } from "./ProfileUpdateDialog";

export default function ProfileInfo({ user }: NavbarProps) {
  return (
    <div>
      <DashboarTitle title={"Profile"} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="">
          {user.profile_photo ? (
            <Image
              src={user.profile_photo as string}
              width={250}
              height={250}
              alt={user?.name}
              className="rounded-xl"
            />
          ) : (
            <p className="text-3xl w-[250] h-[250] bg-gray-300 rounded-xl flex justify-center items-center">
              {getNameInitials(user?.name)}
            </p>
          )}
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-8">
            <div>
              <span className="mb-3 block text-sm">Name</span>
              <div className="p-3  border rounded-xl w-full">{user?.name}</div>
            </div>
            <div>
              <span className="mb-3 block text-sm">Email</span>
              <div className="p-3  border rounded-xl w-full">{user?.email}</div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <span className="mb-3 block text-sm">Phone</span>
              <div className="p-3  border rounded-xl w-full">{user?.phone}</div>
            </div>
            <div>
              <span className="mb-3 block text-sm">Role</span>
              <div className="p-3  border rounded-xl w-full">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      <ProfileUpdateDialog user={user} />
    </div>
  );
}
