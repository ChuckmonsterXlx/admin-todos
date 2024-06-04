import Image from "next/image";
import Link from "next/link";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";

import { SidebarItem } from "./sidebar-item/SidebarItem";
import { authOptions } from "@/auth";
import { LogoutButton } from "./buttons/LogoutButton";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? "No name";
  const avatarUrl =
    session?.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg";
  // const userRole = role

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="px-6 py-4 -mx-6">
          <Link href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              width={1024}
              height={1024}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt=""
            className="object-cover w-10 h-10 m-auto rounded-full lg:w-28 lg:h-28"
            width={1024}
            height={1024}
            priority={true}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="mt-8 space-y-2 tracking-wide">
          {menuItems.map((menuItem) => (
            <SidebarItem
              icon={menuItem.icon}
              path={menuItem.path}
              title={menuItem.title}
              key={menuItem.path}
            />
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between px-6 pt-4 -mx-6 border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
