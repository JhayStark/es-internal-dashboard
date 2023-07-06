import React, { useState } from "react";

const Modal = ({ modalState, close }) => {
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
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] font-sans backdrop-invert-[20%]  ">
          <div className="w-[30%] p-5 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Top Up Balance</h2>
            <form onSubmit={handleSubmit}>
              <select className="w-full px-4 py-2 mb-4 bg-white border-b-[1px]  focus:outline-none ">
                <option value="cash">Cash</option>
              </select>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter amount in cedis"
                className="w-full px-4 py-2 mb-4 border-b-[1px]  focus:outline-none "
              />
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
                  className="px-4 py-2 font-bold text-white bg-[#F24E1E] rounded hover:scale-110"
                >
                  Top-Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
