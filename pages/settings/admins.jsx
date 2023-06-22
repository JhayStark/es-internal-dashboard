import AdminModal from "@/components/AdminModal";
import DeleteModal from "@/components/DeleteModal";
import EditAdminModal from "@/components/EditAdminModal";
import SettingsLayout from "@/components/SettingsLayout";
import React, { useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

const Admins = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <SettingsLayout>
      <div className="pb-5 border-b-[1px] flex flex-row items-center justify-between">
        <div>
          <p className="px-5 text-lg font-medium">Administrators</p>
          <p className="px-5 text-[#747474] text-sm">
            List of administrator accounts
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-[#0FA958] text-white px-3 py-1 rounded-md font-semibold hover:scale-105"
        >
          Add Admin
        </button>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5">
        <p className="text-lg font-medium text-left">Admin Name</p>
        <p className="text-lg font-medium text-center">Role</p>
        <p className="text-lg font-medium text-center">Department</p>
        <p className="text-lg font-medium text-center">Action</p>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 bg-[#EDF3FF]">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Sadat Mohammed
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">
          Systems Admin
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit
            className="text-[#0FA958] hover:scale-110 cursor-pointer"
            onClick={openEditModal}
          />
          <RiDeleteBin5Line
            className="text-[#E53E3E] hover:scale-110 cursor-pointer"
            onClick={openDeleteModal}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 ">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Thomas Kensah
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">C.T.O</p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit className="text-[#0FA958] hover:scale-110 cursor-pointer" />
          <RiDeleteBin5Line className="text-[#E53E3E] hover:scale-110 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 bg-[#EDF3FF]">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Sadat Mohammed
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">
          Systems Admin
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit className="text-[#0FA958] hover:scale-110 cursor-pointer" />
          <RiDeleteBin5Line className="text-[#E53E3E] hover:scale-110 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 ">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Thomas Kensah
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">C.T.O</p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit className="text-[#0FA958] hover:scale-110 cursor-pointer" />
          <RiDeleteBin5Line className="text-[#E53E3E] hover:scale-110 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 bg-[#EDF3FF]">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Sadat Mohammed
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">
          Systems Admin
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit className="text-[#0FA958] hover:scale-110 cursor-pointer" />
          <RiDeleteBin5Line className="text-[#E53E3E] hover:scale-110 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 p-5 ">
        <p className="text-lg font-medium text-[#747474] text-left">
          Mr Thomas Kensah
        </p>
        <p className="text-lg font-medium text-[#747474] text-center">C.T.O</p>
        <p className="text-lg font-medium text-[#747474] text-center">Tech</p>
        <div className="flex flex-row items-center justify-center gap-2 text-xl font-medium">
          <LuEdit className="text-[#0FA958] hover:scale-110 cursor-pointer" />
          <RiDeleteBin5Line className="text-[#E53E3E] hover:scale-110 cursor-pointer" />
        </div>
      </div>
      <AdminModal modalState={isOpen} close={closeModal} />
      <EditAdminModal modalState={editModal} close={closeEditModal} />
      <DeleteModal modalState={deleteModal} close={closeDeleteModal} />
    </SettingsLayout>
  );
};

export default Admins;
