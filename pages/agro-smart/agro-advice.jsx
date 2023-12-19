import React, { useEffect, useState, useRef } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useFarmerTypes, useAgronomicAdviceData } from '@/hooks/fetchers';
import mtnApi from '@/utils/mtnInstance';

const AgronomicAdivce = () => {
  const inputRef = useRef(null);
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
  const [audioFiles, setAudioFiles] = useState([]);
  const { farmerTypes } = useFarmerTypes();
  const { agronomicAdivce, agronomicAdviceIsLoading, agronomicAdivceError } =
    useAgronomicAdviceData(new Date(selectedDate).toISOString().split('T')[0]);
  const [uploadedAudioFiles, setUploadedAudioFiles] = useState([]);

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

  const uploadAudioFile = async file => {
    const formData = new FormData();
    formData.append('audio', file);
    try {
      const response = await mtnApi.post('/advices/upload', formData);
      return response.data.downloadURL;
    } catch (error) {
      alert('Failed to upload');
    }
  };

  useEffect(() => {
    if (audioFiles) {
      audioFiles.forEach(async file => {
        try {
          const url = await uploadAudioFile(file);
          console.log(url);
          setUploadedAudioFiles(prev => [
            ...prev,
            { title: file.name, body: url },
          ]);
          console.log(uploadedAudioFiles);
        } catch (error) {
          alert('Failed to upload');
        }
      });
    }
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
    <div className='flex flex-col min-h-full '>
      <AgroSmartNavigationTab />
      <div className='grid flex-grow grid-rows-1 gap-3 md:grid-rows-2 md:grid-cols-2'>
        <div className='flex flex-col p-5 bg-white rounded-lg md:row-span-2 shadow-3xl'>
          <div className='flex justify-between mb-5 '>
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
            className='border-[1px] rounded-lg w-full p-2 mt-5 flex-grow  box-border'
            placeholder='Enter agronomic advice here.....'
            onChange={handleTextAdvice}
            name='body'
            value={textAdvice.body}
          />
        </div>
        <div className='hidden bg-white rounded-lg md:block shadow-3xl'>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            published={[]}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
        <div className='items-center justify-center hidden bg-white rounded-lg md:flex shadow-3xl'>
          <div className='flex flex-col items-center justify-center font-medium text-gray-600 cursor-pointer'>
            <IoIosAddCircleOutline
              className='text-2xl'
              onClick={() => inputRef.current.click()}
            />

            <p>Add Voice Message</p>
            <input
              type='file'
              name=''
              id='add-audio'
              className='hidden'
              ref={inputRef}
              onChange={e =>
                setAudioFiles(prev => [...prev, e.target.files[0]])
              }
            />
            {audioFiles?.map(file => (
              <p key={file.name}>{file.name}</p>
            ))}
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

export default AgronomicAdivce;
