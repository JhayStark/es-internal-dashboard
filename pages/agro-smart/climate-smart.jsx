import React, { useCallback, useEffect, useState } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import dynamic from 'next/dynamic';
import mtnApi from '@/utils/mtnInstance';
import VoiceMessages from '@/components/VoiceMessages';
import { useDebounce } from 'use-debounce';
import { useFarmerTypes, useClimateSmartData } from '@/hooks/fetchers';
import { useForm } from 'react-hook-form';
import { uploadMulitpleFiles } from '@/utils/helpers/audio';
import ViewList from '@/components/agro-smart/ViewList';
import AddNew from '../../components/agro-smart/AddNew';

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
  const [addNew, setAddNew] = useState(true);
  const { farmerTypes } = useFarmerTypes();
  const { climateAdivce, climateAdviceIsLoading } = useClimateSmartData(
    new Date(selectedDate).toISOString()
  );
  const [locationValue] = useDebounce(watch('location'), 1500);

  const getWeatherData = useCallback(async location => {
    try {
      const response = await mtnApi.get(
        `weather-forecasts?location=${location}`
      );
      setWeatherData(response.data?.weather);
    } catch (error) {
      alert('Failed to fetch');
    }
  }, []);

  useEffect(() => {
    getWeatherData(locationValue || 'east-legon');
  }, [locationValue]);

  useEffect(() => {
    if (!climateAdviceIsLoading && climateAdivce.data.length > 0) {
      setAddNew(false);
    }
    reset(defaultValues);
  }, [selectedDate, climateAdviceIsLoading]);

  const viewSelectedAdvice = useCallback(item => {
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
  }, []);

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
  console.log(addNew);
  return (
    <div className='flex flex-col min-h-full pb-2 '>
      <AgroSmartNavigationTab />
      <div className='grid flex-grow grid-rows-1 gap-3 lg:grid-rows-2 lg:grid-cols-2'>
        <div className='flex flex-col p-5 bg-white rounded-lg md:row-span-2 shadow-3xl'>
          {addNew ? (
            <AddNew
              submit={handleSubmit(onSubmit)}
              register={register}
              selectedAdvice={selectedClimateAdivceId}
              setAddNew={setAddNew}
              setShowVoiceModal={setShowVoiceModal}
              watch={watch}
              isLoading={isLoading}
              setCommodities={setCommodities}
              commodities={commodities}
            />
          ) : (
            <ViewList
              advice={climateAdivce}
              reset={reset}
              setAddNew={setAddNew}
              setAdvice={setSelectedClimateAdivceId}
              setAudioFiles={setAudioFiles}
              viewSelectedAdvice={viewSelectedAdvice}
              defaultValues={defaultValues}
            />
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
