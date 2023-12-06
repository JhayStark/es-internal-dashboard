import React, { useEffect, useState } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useFarmerTypes, useClimateSmartData } from '@/hooks/fetchers';
import mtnApi from '@/utils/mtnInstance';

const Weather = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [farmerType, setFarmerType] = useState('');
  const [textAdvice, setTextAdvice] = useState({
    title: '',
    body: '',
    location: '',
  });
  const { farmerTypes } = useFarmerTypes();
  const { agronomicAdivce, agronomicAdviceIsLoading, agronomicAdivceError } =
    useClimateSmartData(new Date(selectedDate).toISOString());

  const handleTextAdvice = e => {
    setTextAdvice({ ...textAdvice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await mtnApi.post('/agronomic-advice', {
        ['farmer_type']: farmerType,
        commodity: selectedCommodity,
        location: textAdvice.location,
        ['text_advice']: {
          title: textAdvice.title,
          body: textAdvice.body,
        },
        ['date_published']: new Date(selectedDate).toISOString(),
      });
      alert('Successfully submitted');
    } catch (error) {
      alert('Failed to submit');
    }
  };

  useEffect(() => {
    if (agronomicAdivce?.data?.length > 0) {
      setSelectedCommodity(agronomicAdivce?.data[0]?.commodity);
      setTextAdvice({
        title: agronomicAdivce?.data[0]['text_advice']?.title,
        body: agronomicAdivce?.data[0]['text_advice']?.body,
        location: agronomicAdivce?.data[0].location,
      });
    } else {
      setTextAdvice({
        title: '',
        body: '',
        location: '',
      });
      setSelectedCommodity('');
    }
  }, [selectedDate, agronomicAdivce]);
  return (
    <div>
      <AgroSmartNavigationTab />
      <div className='grid grid-cols-2 grid-rows-2 gap-3 '>
        <div className='row-span-2 p-5 bg-white rounded-lg shadow-3xl'>
          <div className='flex justify-between mb-5'>
            <label htmlFor='' className='font-medium '>
              Select Commodity:
              <select
                name='commodity'
                id='commodity'
                className='text-sm font-normal rounded bg-inherit focus:outline-none'
                onChange={e => setSelectedCommodity(e.target.value)}
                value={selectedCommodity}
              >
                <option value=''>Select option</option>
                {commodities?.map(crop => (
                  <option value={crop} key={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor='' className='self-end font-medium '>
              Select Farmer Category:
              <select
                name='farmerType'
                id='farmerType'
                className='text-sm font-normal rounded bg-inherit focus:outline-none'
                onChange={e => {
                  setFarmerType(e.target.value);
                  farmerTypes?.filter(type => {
                    if (type.type === e.target.value) {
                      setCommodities(type.commodities);
                      return type.type === e.target.value;
                    }
                  });
                }}
                value={farmerType}
              >
                <option value=''>Select option</option>
                {farmerTypes?.map(type => (
                  <option value={type.type} key={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <input
            type='text'
            name='title'
            className='border-[1px] rounded-lg w-full p-2 mb-5 '
            placeholder='Agronomic advice title'
            onChange={handleTextAdvice}
            value={textAdvice.title}
          />
          <input
            type='text'
            name='location'
            className='border-[1px] rounded-lg w-full p-2 '
            placeholder='Location'
            onChange={handleTextAdvice}
            value={textAdvice.location}
          />
          <textarea
            className='border-[1px] rounded-lg w-full p-2 mt-5 flex-1 h-[80%]'
            placeholder='Enter agronomic advice here.....'
            onChange={handleTextAdvice}
            name='body'
            value={textAdvice.body}
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
        <button
          className='px-3 py-2 text-white bg-green-500 rounded shadow '
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Weather;
