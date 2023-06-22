import { RxAvatar } from "react-icons/rx";
import BreadCrump from "./BreadCrump";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row w-full h-screen font-sans">
      <Sidebar />
      <div className="w-full bg-[#EDF3FF] overflow-y-auto  px-14 ">
        <div className="sticky top-0 flex flex-row justify-between py-4 bg-[#EDF3FF] z-50 ">
          <BreadCrump />
          <div className="flex flex-row items-center gap-2">
            <p>Hi Joel</p>
            <RxAvatar className="text-2xl" />
          </div>
        </div>
        <div className="py-2 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
