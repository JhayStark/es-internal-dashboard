import React, { useState } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Weather = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment());
  return (
    <div>
      <AgroSmartNavigationTab />
      <div className='grid grid-cols-2 grid-rows-2 gap-3 '>
        <div className='row-span-2 p-5 bg-white rounded-lg shadow-3xl'>
          <div className='flex items-center justify-between mb-5'>
            <label htmlFor='' className='font-medium'>
              Select Crop:
              <select
                name=''
                id=''
                className='text-sm font-normal rounded ml- w-36 bg-inherit focus:outline-none'
              >
                <option value='crop'>Cassava</option>
              </select>
            </label>
            <label htmlFor='' className='font-medium'>
              Select Farmer Category:
              <select
                name=''
                id=''
                className='ml-2 text-sm font-normal rounded w-36 bg-inherit focus:outline-none'
              >
                <option value='crop'>Crop Farmer</option>
              </select>
            </label>
          </div>
          <input
            type='text'
            className='border-[1px] rounded-lg w-full p-2 '
            placeholder='Agronomic advice title'
          />
          <textarea
            className='border-[1px] rounded-lg w-full p-2 mt-5 flex-1 h-[80%]'
            placeholder='Enter agronomic advice here.....'
          />
        </div>
        <div className='bg-white rounded-lg shadow-3xl'>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            published={[]}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
        <div className='flex items-center justify-center bg-white rounded-lg shadow-3xl'>
          <div className='flex flex-col items-center justify-center font-medium text-gray-600 cursor-pointer'>
            <IoIosAddCircleOutline className='text-2xl' />
            <p>Add Voice Message</p>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-3'>
        <button className='px-3 py-2 text-white bg-green-500 rounded shadow '>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Weather;
