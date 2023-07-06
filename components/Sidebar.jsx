import React from "react";
import { useRouter } from "next/router";
import { RiHome5Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    link: "/",
    icon: <RiHome5Line />,
  },
  {
    name: "Clients",
    link: "/clients",
    icon: <FaRegUser />,
  },
  {
    name: "Reports",
    link: "/reports",
    icon: <TbReportSearch />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <FiSettings />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="h-full  xl:w-72 2xl:w-80 3xl:w-96 bg-[#073150] flex justify-center py-5">
      <aside className="flex flex-col items-center w-full ">
        <img src="/images/logo.png" className="w-36" />
        <div className="w-full mt-10">
          <Link href="/">
            <div
              className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
                router.pathname === "/"
                  ? "bg-[#EDF3FF] text-[#055189]"
                  : "text-white"
              }`}
            >
              <div className="flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]">
                <div className="text-3xl">
                  <RiHome5Line />
                </div>
                <p className="xl:text-[1.030rem]  2xl:text-[1.174rem]  font-medium ">
                  Dashboard
                </p>
              </div>
            </div>
          </Link>
          <Link href="/clients">
            <div
              className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
                router.pathname.includes("/clients")
                  ? "bg-[#EDF3FF] text-[#055189]"
                  : "text-white"
              }`}
            >
              <div className="flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]">
                <div className="text-3xl">
                  <FaRegUser />
                </div>
                <p className="xl:text-[1.030rem]  2xl:text-[1.174rem]  font-medium ">
                  Clients
                </p>
              </div>
            </div>
          </Link>
          <Link href="/reports">
            <div
              className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
                router.pathname.includes("/reports")
                  ? "bg-[#EDF3FF] text-[#055189]"
                  : "text-white"
              }`}
            >
              <div className="flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]">
                <div className="text-3xl">
                  <TbReportSearch />
                </div>
                <p className="xl:text-[1.030rem]  2xl:text-[1.174rem]  font-medium ">
                  Reports
                </p>
              </div>
            </div>
          </Link>
          <Link href="/settings">
            <div
              className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
                router.pathname.includes("/settings") &&
                !router.pathname.includes("/clients")
                  ? "bg-[#EDF3FF] text-[#055189]"
                  : "text-white"
              }`}
            >
              <div className="flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]">
                <div className="text-3xl">
                  <FiSettings />
                </div>
                <p className="xl:text-[1.030rem]  2xl:text-[1.174rem]  font-medium ">
                  Settings
                </p>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
