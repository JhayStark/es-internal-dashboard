import React, { useState, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const Modal = ({ modalState, close }) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setInputValue('');
    close();
  };

  const outsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close();
    }
  };

  return (
    <div>
      {modalState && (
        <div
          onClick={outsideClick}
          className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] font-sans backdrop-invert-[20%]  '
        >
          <div
            ref={modalRef}
            className='w-[80%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] p-5 mx-auto bg-white rounded-lg shadow-lg'
          >
            <div className='flex flex-row items-center justify-between mb-4'>
              <h2 className='text-lg font-bold'>Top Up Balance</h2>
              <AiFillCloseCircle
                className='text-2xl text-red-400'
                onClick={close}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <select className='w-full px-4 py-2 mb-4 bg-white border-b-[1px]  focus:outline-none '>
                <option value='cash'>Cash</option>
              </select>
              <input
                type='number'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Enter amount in cedis'
                className='w-full px-4 py-2 mb-4 border-b-[1px]  focus:outline-none '
              />
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='px-4 py-2 text-sm font-bold text-white bg-green-400 rounded md:text-base hover:scale-110'
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
