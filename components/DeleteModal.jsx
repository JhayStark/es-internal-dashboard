import React, { useState } from "react";

const DeleteModal = ({ modalState, close }) => {
  const handleDelete = (event) => {
    close();
  };

  return (
    <div>
      {modalState && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  ">
          <div className="w-[30%] p-4 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Delete Admin</h2>
            <p>Are you sure you want to delete this admin</p>
            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="px-4 py-2 font-bold text-white bg-[#E53E3E] rounded hover:scale-110"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
