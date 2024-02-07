import React, { useEffect, useState } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import dynamic from 'next/dynamic';
import mtnApi from '@/utils/mtnInstance';
import VoiceMessages from '../../components/VoiceMessages';
import Spinner from '../../components/svgs/Spinner';
import { useDebounce } from 'use-debounce';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useFarmerTypes, useClimateSmartData } from '@/hooks/fetchers';
import { useForm } from 'react-hook-form';
import { uploadMulitpleFiles } from '@/utils/helpers/audio';

const defaultValues = {
  ['farmer_type']: '',
  location: '',
  commodity: '',
  title: '',
  body: '',
  ['audio_advices']: [],
};

const NoSSRWidget = dynamic(() => import('@/components/WeatherWidget'), {
  ssr: false,
});

const Weather = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(defaultValues);
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [commodities, setCommodities] = useState([]);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClimateAdivceId, setSelectedClimateAdivceId] = useState('');
  const { farmerTypes } = useFarmerTypes();
  const { climateAdivce, climateAdviceIsLoading } = useClimateSmartData(
    new Date(selectedDate).toISOString()
  );
  const [locationValue] = useDebounce(watch('location'), 4000);
  const [addNew, setAddNew] = useState(false);

  const getWeatherData = async location => {
    try {
      const response = await mtnApi.get(
        `weather-forecasts?location=${location}`
      );
      setWeatherData(response.data?.weather);
    } catch (error) {
      alert('Failed to fetch');
    }
  };

  useEffect(() => {
    getWeatherData(locationValue || 'east-legon');
  }, [locationValue]);

  useEffect(() => {
    if (!climateAdviceIsLoading && climateAdivce.data.length > 0) {
      setAddNew(false);
    } else setAddNew(true);
    reset(defaultValues);
  }, [selectedDate]);

  useEffect(() => {
    farmerTypes?.filter(type => {
      if (type.type === watch('farmer_type')) {
        setCommodities(type.commodities);
        return type.type === watch('farmer_type');
      }
    });
  }, [watch('farmer_type')]);

  const viewSelectedAdvice = item => {
    reset({
      ['farmer_type']: item['farmer_type'],
      location: item?.location,
      commodity: item?.commodity,
      title: item['text_advice']?.title,
      body: item['text_advice']?.body,
      ['audio_advices']: item.audio_advices,
    });

    const defaultCommodities =
      farmerTypes?.find(type => type.type === watch('farmer_type'))
        ?.commodities || [];

    setCommodities(defaultCommodities);

    const audioAdivces = item['audio_advices'];
    const refinedAudios = audioAdivces.map(audio => ({
      name: audio.title,
      src: audio.body,
    }));

    setAudioFiles(refinedAudios);
    setSelectedClimateAdivceId(item.id);
    setAddNew(true);
  };

  const onSubmit = async data => {
    setIsLoading(true);
    const filesToUpload = audioFiles.filter(audio => audio instanceof File);
    const uploadedAudios = await uploadMulitpleFiles(filesToUpload);
    const audioToSubmit = [...uploadedAudios];

    const formObject = {
      ['farmer_type']: data['farmer_type'],
      commodity: data.commodity,
      location: data.location,
      ['text_advice']: {
        title: data.title,
        body: data.body,
      },
      ['audio_advices']: audioToSubmit,
      ['date_published']: selectedDate,
      ['weather_info']: weatherData?.description,
    };

    try {
      if (selectedClimateAdivceId) {
        await mtnApi.put(
          `/climate-smart/${selectedClimateAdivceId}`,
          formObject
        );
        reset(defaultValues);
        setAudioFiles([]);
        alert('Updated successfully');
      } else {
        await mtnApi.post('/climate-smart', formObject);
        reset(defaultValues);
        setAudioFiles([]);
        alert('Created successfully');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('Failed to submit');
    }
  };

  return (
    <div className='flex flex-col min-h-full pb-2 '>
      <AgroSmartNavigationTab />
      <div className='grid flex-grow grid-rows-1 gap-3 lg:grid-rows-2 lg:grid-cols-2'>
        <div className='flex flex-col p-5 bg-white rounded-lg md:row-span-2 shadow-3xl'>
          {addNew ? (
            <form
              className='flex flex-col h-full'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex items-start justify-between mb-5 md:flex-row '>
                <label htmlFor='' className='text-lg font-medium '>
                  Select Farmer Category:
                  <select
                    id='farmerType'
                    className='text-sm font-normal rounded bg-inherit focus:outline-none'
                    {...register('farmer_type')}
                  >
                    <option value=''>Select option</option>
                    {farmerTypes?.map(type => (
                      <option value={type.type} key={type.type}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor='' className='text-lg font-medium'>
                  Select Commodity:
                  <select
                    id='commodity'
                    className='text-sm font-normal rounded bg-inherit focus:outline-none'
                    {...register('commodity')}
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
                className='border-[1px] rounded-lg w-full p-2 mb-5 '
                placeholder='Location'
                {...register('location')}
              />
              <input
                type='text'
                className='border-[1px] rounded-lg w-full p-2  '
                placeholder='Agronomic advice title'
                {...register('title')}
              />
              <textarea
                className='border-[1px] rounded-lg w-full p-2 mt-5 flex-grow  box-border'
                placeholder='Enter agronomic advice here.....'
                {...register('body')}
              />

              <div className='flex items-center justify-between pt-2'>
                <button
                  className='flex items-center gap-2 text-primary'
                  type='button'
                  onClick={() => {
                    setShowVoiceModal(true);
                  }}
                >
                  <IoIosAddCircleOutline className='text-2xl' />
                  Add voice messages
                </button>
                <div className='flex items-end gap-2'>
                  <button
                    className='px-3 py-2 text-sm text-white rounded shadow bg-primary '
                    type='button'
                    onClick={() => setAddNew(false)}
                  >
                    View Advices
                  </button>
                  <button
                    className='px-3 py-2 text-sm text-white bg-green-500 rounded shadow '
                    type='submit'
                  >
                    {isLoading
                      ? 'Loading...'
                      : selectedClimateAdivceId
                      ? 'Update'
                      : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className='flex items-center justify-between'>
                <p>Total Sent: {`${climateAdivce?.data.length}`}</p>
                <button
                  className='p-1 text-sm font-medium text-white bg-green-400 rounded round'
                  onClick={() => {
                    setSelectedClimateAdivceId('');
                    setAudioFiles([]);
                    reset(defaultValues);
                    setAddNew(true);
                  }}
                >
                  Add New
                </button>
              </div>
              <div className='max-h-[80vh] py-2 space-y-4 overflow-y-auto '>
                {climateAdivce?.data?.map(item => (
                  <div
                    className='p-3 rounded shadow-md bg-blue-50'
                    key={item.id}
                  >
                    <div className='space-y-2 text-sm'>
                      <div className='flex items-center justify-between'>
                        <p className='font-medium'>
                          Targert Group :{' '}
                          {`${item['farmer_type']}(${item.commodity})`}
                        </p>
                        <MdOutlineRemoveRedEye
                          className='text-xl cursor-pointer text-blue-950 hover:scale-125'
                          onClick={() => viewSelectedAdvice(item)}
                        />
                      </div>
                      <p className='text-gray-700'>
                        Title : {`${item['text_advice']?.title}`}
                      </p>
                      <p className='overflow-y-auto text-gray-700 max-h-20'>
                        {item['text_advice']?.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='hidden bg-white rounded-lg lg:block shadow-3xl'>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            published={[]}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
        <div className='hidden bg-white rounded-lg lg:flex shadow-3xl bg-gradient-to-r from-blue-500 to-blue-400'>
          <NoSSRWidget
            location={locationValue || 'East legon'}
            weatherData={weatherData}
          />
        </div>
      </div>
      {showVoiceModal && (
        <VoiceMessages
          setAudioFiles={setAudioFiles}
          messages={audioFiles}
          closeModal={() => setShowVoiceModal(false)}
        />
      )}
    </div>
  );
};

export default Weather;
