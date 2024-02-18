import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import mtnApi from '@/utils/mtnInstance';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelectedFarmerData } from '@/hooks/fetchers';

const defaultValues = {
  volume: 0,
  unit: '',
  crop: '',
  year: '',
};

const labelStyles = ' text-gray-700 block';
const inputStyles = 'p-2 border w-full rounded border-gray-300 bg-inherit';
const spanStyles = 'text-sm text-red-500 block';

const unitOptions = [
  { value: 'kg', label: 'Kg' },
  { value: 'lb', label: 'Lbs' },
];

const currencyOptions = [{ value: 'GHS', label: 'GHS' }];

const Harvest = ({ close }) => {
  const router = useRouter();
  const farmerId = router.query.id;
  const modalRef = useRef(null);
  const [cropOptions, setCropOptions] = useState([]);
  const { farmer, farmerError, farmerIsLoading } =
    useSelectedFarmerData(farmerId);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm(defaultValues);

  const outsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    const farmerData = JSON.parse(localStorage.getItem('viewData'));
    const cropData = farmer?.data?.crops.map(crop => {
      return { value: crop, label: crop };
    });
    setCropOptions(cropData);
  }, [farmer]);

  async function addHarvest(data) {
    try {
      await mtnApi.post(`/farmers/${farmerId}/harvests`, {
        ...data,
        volume: +data.volume,
      });
      alert('Harvest added successfully');
    } catch (error) {
      alert('Failed to submit');
    }
  }

  return (
    <div
      onClick={outsideClick}
      className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] font-sans backdrop-invert-[20%]  '
    >
      <div
        ref={modalRef}
        className='w-[90%]  max-w-xl  p-5 mx-auto bg-white rounded-lg shadow-lg'
      >
        <h2 className='text-lg font-bold text-center text-gray-800'>
          Add Harvest
        </h2>
        <form
          onSubmit={handleSubmit(addHarvest)}
          className=' py-2 space-y-6  max-h-[90vh] overflow-y-auto'
        >
          <div>
            <label htmlFor='volume' className={labelStyles}>
              Volume of Harvest
            </label>
            <div>
              <input
                type='number'
                id='volume'
                className={inputStyles}
                placeholder='1000'
                {...register('volume', { required: true })} // Register input with validation
              />
            </div>
            {errors.volume && (
              <span className={spanStyles}>First name is required</span>
            )}
          </div>
          <div>
            <label htmlFor='unit' className={labelStyles}>
              Unit
            </label>
            <Select
              options={unitOptions}
              onChange={e => setValue('unit', e.value)}
              value={unitOptions.find(option => option.value === watch('unit'))}
            />
          </div>
          <div>
            <label htmlFor='unit' className={labelStyles}>
              Crops
            </label>
            <Select
              options={cropOptions}
              onChange={e => setValue('crop', e.value)}
              value={cropOptions.find(option => option.value === watch('crop'))}
            />
          </div>
          <div>
            <label htmlFor='year' className={labelStyles}>
              Year of sale
            </label>
            <div>
              <input
                type='text'
                id='year'
                className={inputStyles}
                placeholder='2024'
                {...register('year', { required: true })} // Register input with validation
              />
            </div>
            {errors.year && (
              <span className={spanStyles}>Year is required</span>
            )}
          </div>
          <div className='flex justify-end gap-2 md:col-span-2'>
            <button
              type='button'
              onClick={close}
              className='px-3 py-2 text-sm font-medium text-white bg-red-400 rounded md:text-base hover:scale-110'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='p-2 text-sm font-medium text-white bg-green-400 rounded md:text-base hover:scale-110'
            >
              Add Harvest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Harvest;
