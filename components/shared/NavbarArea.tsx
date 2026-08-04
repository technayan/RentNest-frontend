import { getMe } from "@/service/getMe";
import { Menu } from "@base-ui/react";
import { Navbar } from "./Navbar";

export default async function NavbarArea() {
  const user = await getMe();

  return (
    <Menu.Group>
      <Navbar user={user?.data} />
    </Menu.Group>
  );
}
