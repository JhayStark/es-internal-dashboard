import { RiVoiceprintLine } from "react-icons/ri";
import { TbMessageDots } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="font-sans ">
        <div className="grid grid-cols-3 gap-[1.4rem] mb-14 ">
          <div className="flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl">
            <div className="flex items-center justify-between">
              <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium">
                Push (Voice)
              </p>
              <div className="border-2 border-[#D27C2C] p-1 rounded-full">
                <RiVoiceprintLine className="text-[#D27C2C] text-xl" />
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
                Push (Sms)
              </p>
              <TbMessageDots className="text-4xl text-[#D27C2C]  " />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-light">Updated 30mins ago</p>
              <p className="text-[#055189] text-2xl">5000</p>
            </div>
          </div>
          <div className="flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl">
            <div className="flex items-center justify-between">
              <p className="xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium">
                Insyt (Forms)
              </p>
              <CgNotes className="text-4xl text-[#D27C2C] font-medium" />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-light">Updated 30mins ago</p>
              <p className="text-[#055189] text-2xl">5000</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-3xl ">
          <p className="py-3 border-b-[1px] mb-6 xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium pl-5">
            Recent Payments
          </p>
          <div className="grid grid-cols-6 mb-2 gap-7">
            <p className="pl-5 text-lg font-medium text-left ">
              Transaction ID
            </p>
            <p className="text-lg font-medium text-center "> Client Name</p>
            <p className="text-lg font-medium text-center ">Date</p>
            <p className="text-lg font-medium text-center ">Status</p>
            <p className="text-lg font-medium text-center ">Amount</p>
            <p className="text-lg font-medium text-center ">Service</p>
          </div>
          <div className="overflow-y-auto h-[34rem]">
            <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
              <p className="pl-5 text-lg text-left ">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#FF0000]">Failed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <div className="grid grid-cols-6 py-6 gap-7 ">
              <p className="pl-5 text-lg text-left">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#FF0000]">Failed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
              <p className="pl-5 text-lg text-left">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#0FA958]">Completed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <div className="grid grid-cols-6 py-6 gap-7 ">
              <p className="pl-5 text-lg text-left">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#FF0000]">Failed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
              <p className="pl-5 text-lg text-left">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#0FA958]">Completed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <div className="grid grid-cols-6 py-6 gap-7 ">
              <p className="pl-5 text-lg text-left">TID 245</p>
              <p className="text-lg text-center">Jay Inc</p>
              <p className="text-lg text-center">07/05/2023</p>
              <p className="text-lg text-center text-[#0FA958]">Completed</p>
              <p className="text-lg text-center">GHC 5000</p>
              <p className="text-lg text-center">Push</p>
            </div>
            <Link href="/reports">
              <p className="text-xl py-6  font-medium text-center cursor-pointer text-[#055189] hover:underline">
                View all payments
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
