import { FaUsers, FaUserSlash } from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { useRouter } from "next/router";
import PieChartComponent from "@/components/PieChart";

const Clients = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-3 gap-[1.4rem] mb-14 ">
        <div className="flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl">
          <div className="flex items-center justify-between">
            <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium">
              Total Users
            </p>
            <div className="border-4 border-[#D27C2C] p-1 rounded-lg">
              <FaUsers className="text-[#D27C2C] text-2xl" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-light">Updated 30mins ago</p>
            <p className="text-[#055189] text-2xl">5000</p>
          </div>
        </div>
        <div className="flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl">
          <div className="flex items-center justify-between">
            <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium">
              Active Users
            </p>
            <AiOutlineCheckCircle className="text-4xl text-[#0FA958]  " />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-light">Updated 30mins ago</p>
            <p className="text-[#055189] text-2xl">5000</p>
          </div>
        </div>
        <div className="flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl">
          <div className="flex items-center justify-between">
            <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium">
              Disabled Users
            </p>
            <FaUserSlash className="text-4xl text-[#F24E1E] font-medium" />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-light">Updated 30mins ago</p>
            <p className="text-[#055189] text-2xl">5000</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[1.4rem] mb-14 ">
        <div className="p-4 bg-white rounded-lg shadow-3xl max-h-[25rem] 3xl:px-7">
          <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem]  font-semibold">
            Services Used
          </p>

          <PieChartComponent />

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#214BB8]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">insyt</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#FE634E]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">Sms</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-2 rounded-xl bg-[#45ADDA]"></div>
              <p className="text-lg font-semibold">2250</p>
              <p className="text-sm text-[#7E7E7E]">Voice</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 min-h-[38rem] ">
          <div className="h-full p-4 bg-white rounded-lg shadow-3xl ">
            <div className="flex items-center justify-between py-3 border-b-[1px]">
              <p className="pl-5 text-xl font-medium ">User List</p>
              <div className="flex flex-row items-center border-[1px] rounded-md p-2">
                <AiOutlineSearch className="text-slate-500" />
                <input
                  type="text"
                  className="px-2 focus:outline-none "
                  placeholder="Seacrh"
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-5 gap-2 py-4 ">
                <p className="pl-5 text-lg font-medium text-left ">
                  Joined Date
                </p>
                <p className="text-lg font-medium text-center ">
                  Organization Name
                </p>
                <p className="text-lg font-medium text-center ">Sms Balance</p>
                <p className="text-lg font-medium text-center ">Active Forms</p>
                <p className="text-lg font-medium text-center ">Action</p>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 bg-[#EDF3FF] ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 bg-[#EDF3FF] ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 bg-[#EDF3FF] ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-4 bg-[#EDF3FF] ">
                <p className="pl-5 text-lg text-left">24/08/2022</p>
                <p className="text-lg text-center">Jay Inc</p>
                <p className="text-lg text-center ">GHC. 5456.00</p>
                <p className="text-lg text-center ">500</p>
                <div className="flex items-center justify-center text-[#699BF7] text-3xl hover:scale-125 cursor-pointer">
                  <AiOutlineEye onClick={() => router.push("clients/1")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
