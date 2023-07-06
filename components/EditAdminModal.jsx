import React, { useState } from "react";

const EditAdminModal = ({ modalState, close }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // e.g., make an API call or perform some action with the input value
    console.log("Submitted:", inputValue);
    setInputValue("");
    close();
  };

  return (
    <div>
      {modalState && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  ">
          <div className="w-[30%] p-4 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Edit Admin Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-5 py-4">
                <div className="flex flex-col w-full gap-2">
                  <p>Name:</p>
                  <input
                    type="text"
                    className="border-[1px] py-3 px-5 rounded"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <p>Role:</p>
                  <select
                    type="text"
                    className="border-[1px] bg-white py-3 px-5 rounded focus:outline-none"
                    placeholder="John Doe"
                  >
                    <option value="1">C.T.O</option>
                  </select>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <p>Role:</p>
                  <select
                    type="text"
                    className="border-[1px] bg-white py-3 px-5 rounded focus:outline-none"
                    placeholder="John Doe"
                  >
                    <option value="1">Tech</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#0FA958] rounded hover:scale-110"
                >
                  Edit Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAdminModal;
