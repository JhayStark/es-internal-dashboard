import React from "react";
import { AiOutlineSearch, AiOutlineDownload } from "react-icons/ai";

const Table = ({ title }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between border-b-[1px]">
        <p className="py-3 mb-6 text-lg font-semibold">{title}</p>
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-row items-center border-[1px] rounded-md p-2">
            <AiOutlineSearch className="text-slate-500" />
            <input
              type="text"
              className="px-2 focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="relative">
            <AiOutlineDownload className="text-2xl cursor-pointer " />
            {false && (
              <div className="absolute p-5 mt-2 rounded-lg bg-slate-100 shadow-3xl right-1">
                <div className="flex flex-row items-center border-[1px] rounded-md p-2">
                  <AiOutlineSearch className="text-slate-500" />
                  <input
                    type="text"
                    className="px-2 focus:outline-none bg-inherit"
                    placeholder="Enter Client Name"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 mb-2 gap-7">
        <p className="text-lg font-medium text-center ">Transaction ID</p>
        <p className="text-lg font-medium text-center "> Client Name</p>
        <p className="text-lg font-medium text-center ">Date</p>
        <p className="text-lg font-medium text-center ">Status</p>
        <p className="text-lg font-medium text-center ">Amount</p>
        <p className="text-lg font-medium text-center ">Service</p>
      </div>
      <div className="overflow-y-auto h-[34rem]">
        <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#FF0000]">Failed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
        <div className="grid grid-cols-6 py-6 gap-7 ">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#FF0000]">Failed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
        <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#0FA958]">Completed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
        <div className="grid grid-cols-6 py-6 gap-7 ">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#FF0000]">Failed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
        <div className="grid grid-cols-6 py-6 gap-7 bg-[#EDF3FF]">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#0FA958]">Completed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
        <div className="grid grid-cols-6 py-6 gap-7 ">
          <p className="text-lg text-center">TID 245</p>
          <p className="text-lg text-center">Jay Inc</p>
          <p className="text-lg text-center">07/05/2023</p>
          <p className="text-lg text-center text-[#0FA958]">Completed</p>
          <p className="text-lg text-center">GHC 5000</p>
          <p className="text-lg text-center">Push</p>
        </div>
      </div>
    </>
  );
};

export default Table;
