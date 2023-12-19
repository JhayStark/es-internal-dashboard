import React, { useEffect, useState, useRef } from 'react';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import mtnApi from '@/utils/mtnInstance';
import { useForm } from 'react-hook-form';
import { IoIosAddCircleOutline, IoMdCloseCircle } from 'react-icons/io';
import { useFarmerTypes, useAgronomicAdviceData } from '@/hooks/fetchers';
import { uploadMulitpleFiles } from './climate-smart';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { FaPlay } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi';

const defaultValues = {
  ['farmer_type']: '',
  location: '',
  commodity: '',
  title: '',
  body: '',
  ['audio_advices']: [],
};

const AgronomicAdivce = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(defaultValues);

  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedAgronomicAdvice, setSelectedAgronomicAdvice] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const { farmerTypes } = useFarmerTypes();
  const { agronomicAdivce, agronomicAdviceIsLoading } = useAgronomicAdviceData(
    new Date(selectedDate).toISOString().split('T')[0]
  );

  const hanleDrop = file => {
    const fileCopy = file[0];
    const src = URL.createObjectURL(fileCopy);
    fileCopy.src = src;
    setAudioFiles(prev => [...prev, fileCopy]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: hanleDrop,
    multiple: true,
  });

  useEffect(() => {
    farmerTypes?.filter(type => {
      if (type.type === watch('farmer_type')) {
        setCommodities(type.commodities);
        return type.type === watch('farmer_type');
      }
    });
  }, [watch('farmer_type')]);

  useEffect(() => {
    if (!agronomicAdviceIsLoading && agronomicAdivce.data.length > 0) {
      setAddNew(false);
    } else setAddNew(true);
    reset(defaultValues);
  }, [selectedDate]);

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
    setSelectedAgronomicAdvice(item.id);
    setAddNew(true);
  };

  const onSubmit = async data => {
    const filesToUpload = audioFiles.filter(audio => audio instanceof File);
    const uploadedAudios = await uploadMulitpleFiles(filesToUpload);
    const filesAlreadyUploaded = audioFiles.filter(
      audio => !(audio instanceof File)
    );
    const refinedAudios = filesAlreadyUploaded.map(audio => {
      return { title: audio.name, body: audio.src };
    });
    const audioToSubmit = [...uploadedAudios, ...refinedAudios];
    const formObject = {
      ['farmer_type']: data['farmer_type'],
      commodity: data.commodity,
      location: data.location,
      ['text_advice']: {
        title: data.title,
        body: data.body,
      },
      ['date_published']: new Date(selectedDate).toISOString(),
      ['audio_advices']: audioToSubmit,
    };
    try {
      if (selectedAgronomicAdvice) {
        await mtnApi.put(
          `/agronomic-advice/${selectedAgronomicAdvice}`,
          formObject
        );

        reset(defaultValues);
        setAudioFiles([]);
        alert('Successfully updated');
      } else {
        await mtnApi.post('/agronomic-advice', formObject);

        reset(defaultValues);
        setAudioFiles([]);
        alert('Successfully submitted');
      }
    } catch (error) {
      alert('Failed to submit');
    }
  };

  return (
    <div className='flex flex-col min-h-full '>
      <AgroSmartNavigationTab />
      <div className='grid flex-grow grid-rows-1 gap-3 md:grid-rows-2 md:grid-cols-2'>
        <div className='flex flex-col p-5 bg-white rounded-lg md:row-span-2 shadow-3xl'>
          {addNew ? (
            <form
              className='flex flex-col h-full'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex flex-col items-start justify-between mb-5 lg:flex-row '>
                <label htmlFor='' className='font-medium '>
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
                <label htmlFor='' className='font-medium '>
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

              <div className='flex items-center justify-end pt-2'>
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
                    {selectedAgronomicAdvice ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className='flex items-center justify-between'>
                <p>Total Sent: {`${agronomicAdivce?.data.length}`}</p>
                <button
                  className='p-1 text-sm font-medium text-white bg-green-400 rounded round'
                  onClick={() => {
                    setSelectedAgronomicAdvice('');
                    setAudioFiles([]);
                    reset(defaultValues);
                    setAddNew(true);
                  }}
                >
                  Add New
                </button>
              </div>
              <div className='max-h-[80vh] py-2 space-y-4 overflow-y-auto '>
                {agronomicAdivce?.data?.map(item => (
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
                      <p>Title : {`${item['text_advice']?.title}`}</p>
                      <p className='overflow-y-auto max-h-20'>
                        {item['text_advice']?.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
          <div className='flex flex-col w-full h-full px-2 py-3'>
            <div
              {...getRootProps()}
              className={`box-border flex items-center justify-center flex-grow w-full rounded text-gray-700  border-dashed border-[1px] ${
                isDragActive ? 'bg-blue-200' : ''
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here</p>
              ) : (
                <p>Drag and drop file here or click to browse</p>
              )}
            </div>
            <div className='flex-grow mt-5'>
              {audioFiles.length > 0 && (
                <ul className='px-5 space-y-3'>
                  {audioFiles.map(file => {
                    const audio = new Audio(file.src);

                    return (
                      <li
                        key={file.name}
                        className='flex items-center justify-between gap-2 text-sm'
                      >
                        <div className='flex items-center gap-2'>
                          <FaPlay
                            className='text-blue-500 cursor-pointer hover:scale-125'
                            onClick={() => {
                              audio.play();
                            }}
                          />
                          <HiOutlinePause
                            className='text-base text-red-600 cursor-pointer hover:scale-125'
                            onClick={() => {
                              audio.pause();
                            }}
                          />
                        </div>
                        <span className='truncate max-w-[60ch]'>
                          {file.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgronomicAdivce;
