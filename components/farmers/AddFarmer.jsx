import React, { useEffect, useMemo, useRef } from 'react';
import Select from 'react-select';
import mtnApi from '@/utils/mtnInstance';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelectedFarmerData } from '../../hooks/fetchers';
import countryData from '../../data/cities.json';
import categoriesData from '../../data/categories.json';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Aprroved' },
  { value: 'rejected', label: 'Rejected' },
];

const defaultValues = {
  firstName: '',
  lastName: '',
  contact: '',
  gender: '',
  language: '',
  dateOfbirth: '',
};

const labelStyles = ' text-gray-700 block';
const inputStyles = 'p-2 border w-full rounded border-gray-300 bg-inherit';
const spanStyles = 'text-sm text-red-500 block';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Twi', label: 'Twi' },
];

const countryOptions = [{ value: 'Ghana', label: 'Ghana' }];

const regionOptions = Object.keys(countryData).map(option => {
  return { value: option, label: option };
});

const agricCategories = Object.keys(categoriesData).map(option => {
  return { value: option, label: option };
});

const AddFarmer = ({ close }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm(defaultValues);

  const farmerId = router.query.farmerId || router.query.id || '';
  const rowData = router.query.rowData || '';
  const { farmer, farmerError, farmerIsLoading } =
    useSelectedFarmerData(farmerId);

  const districtOptions = useMemo(() => {
    return (
      countryData[watch('region')]?.map(option => {
        return { value: option, label: option };
      }) || []
    );
  }, [watch('region')]);

  const cropOptions = useMemo(() => {
    return (
      categoriesData[watch('category')]?.map(option => {
        return { value: option, label: option };
      }) || []
    );
  }, [watch('category')]);

  useEffect(() => {
    // const fixData = localStorage.getItem('viewData');
    // if (rowData) {
    //   const farmer = { data: JSON.parse(rowData) };
    //   const farmerName = farmer.data?.name
    //     .split(' ')
    //     .map(str => str.trim())
    //     .filter(str => str !== '');
    //   reset({
    //     firstName: farmerName[0],
    //     lastName: farmerName[1],
    //     contact: farmer?.data?.phone,
    //     gender: farmer?.data?.gender,
    //     language: farmer?.data?.language,
    //     country: farmer?.data?.country,
    //     region: farmer?.data?.region,
    //     location: farmer?.data?.district,
    //     category: farmer?.data?.category,
    //     crops: farmer?.data?.crops,
    //     status: farmer?.data?.status,
    //     dateOfbirth: farmer?.data?.dob.split('T')[0],
    //   });
    // }
    // if (fixData && farmerId) {
    //   const farmer = { data: JSON.parse(fixData) };
    //   const farmerName = farmer.data?.name
    //     .split(' ')
    //     .map(str => str.trim())
    //     .filter(str => str !== '');
    //   reset({
    //     firstName: farmerName[0],
    //     lastName: farmerName[1],
    //     contact: farmer?.data?.phone,
    //     gender: farmer?.data?.gender,
    //     language: farmer?.data?.language,
    //     country: farmer?.data?.country,
    //     region: farmer?.data?.region,
    //     location: farmer?.data?.district,
    //     category: farmer?.data?.category,
    //     crops: farmer?.data?.crops,
    //     status: farmer?.data?.status,
    //     dateOfbirth: farmer?.data?.dob.split('T')[0],
    //   });
    // }
    if (farmer) {
      const farmerName = farmer.data?.name
        .split(' ')
        .map(str => str.trim())
        .filter(str => str !== '');
      reset({
        firstName: farmerName[0],
        lastName: farmerName[1],
        contact: farmer?.data?.phone,
        gender: farmer?.data?.gender,
        language: farmer?.data?.language,
        country: farmer?.data?.country,
        region: farmer?.data?.region,
        location: farmer?.data?.district,
        category: farmer?.data?.category,
        crops: farmer?.data?.crops,
        status: farmer?.data?.status,
        dateOfbirth: farmer?.data?.dob.split('T')[0],
      });
    }
  }, [farmerId, farmer]);

  const onSubmit = async event => {
    const formData = {
      name: `${event.firstName} ${event.lastName}`,
      phone: event.contact,
      gender: event.gender,
      language: event.language,
      dob: event.dateOfbirth,
      country: event.country,
      region: event.region,
      district: event.location,
      community: event.location,
      farmSize: 50,
      category: event.category,
      status: event.status,
      crops: event.crops,
    };

    try {
      if (!farmerId) {
        await mtnApi.post('/farmers', formData);
        alert('Farmer created');
      } else {
        await mtnApi.put(`/farmers/${farmerId}`, formData);
        alert('Farmer updated');
      }
    } catch (error) {
      alert('Failed to submit');
    }
  };

  const outsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close();
    }
  };

  return (
    <div>
      <div
        onClick={outsideClick}
        className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] font-sans backdrop-invert-[20%]  '
      >
        <div
          ref={modalRef}
          className='w-[90%] max-h-[90vh] max-w-4xl  p-5 mx-auto bg-white rounded-lg shadow-lg'
        >
          <h2 className='text-lg font-bold text-center text-gray-800'>
            {farmerId ? 'Edit Farmer' : 'Add Farmer'}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid py-2 gap-6 md:grid-cols-2 max-h-[90vh] overflow-y-auto'
          >
            <div>
              <label htmlFor='firstName' className={labelStyles}>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                className={inputStyles}
                placeholder='Kweku Smith'
                {...register('firstName', { required: true })} // Register input with validation
              />
              {errors.firstName && (
                <span className={spanStyles}>First name is required</span>
              )}
            </div>
            <div>
              <label htmlFor='lastName' className={labelStyles}>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                className={inputStyles}
                {...register('lastName', { required: true })} // Register input with validation
              />
              {errors.lastName && (
                <span className={spanStyles}>Last name is required</span>
              )}
            </div>
            <div>
              <label htmlFor='dateOfbirth' className={labelStyles}>
                Date of birth
              </label>
              <input
                type='date'
                id='dateOfbirth'
                className={inputStyles}
                {...register('dateOfbirth', { required: true })} // Register input with validation
              />
              {errors.farmerName && (
                <span className={spanStyles}>First name is required</span>
              )}
            </div>
            <div>
              <label htmlFor='gender' className={labelStyles}>
                Gender
              </label>
              <Select
                options={genderOptions}
                onChange={e => setValue('gender', e.value)}
                value={genderOptions.find(
                  option => option.value === watch('gender')
                )}
              />
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='dateOfbirth' className={labelStyles}>
                Phone Number
              </label>
              <input
                type='text'
                id='contact'
                className={inputStyles}
                {...register('contact', { required: true })} // Register input with validation
              />
              {errors.contact && (
                <span className={spanStyles}>Phone number is required</span>
              )}
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='language' className={labelStyles}>
                Languages
              </label>
              <Select
                options={languageOptions}
                onChange={e => {
                  // const values = e.map(item => item.value);
                  setValue('language', e.value);
                }}
                value={languageOptions.find(
                  option => option.value === watch('language')
                )}
              />
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='location' className={labelStyles}>
                Country
              </label>
              <Select
                options={countryOptions}
                onChange={e => setValue('country', e.value)}
                value={countryOptions.find(
                  option => option.value === watch('country')
                )}
              />
            </div>

            <div className='md:col-span-2'>
              <label htmlFor='location' className={labelStyles}>
                Region / State
              </label>
              <Select
                options={regionOptions}
                onChange={e => setValue('region', e.value)}
                value={regionOptions.find(
                  option => option.value === watch('region')
                )}
              />
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='location' className={labelStyles}>
                District
              </label>
              <Select
                options={districtOptions}
                onChange={e => setValue('location', e.value)}
                value={districtOptions.find(
                  option => option.value === watch('location')
                )}
              />
            </div>
            <div>
              <label htmlFor='location' className={labelStyles}>
                Agricultaural Category
              </label>
              <Select
                options={agricCategories}
                onChange={e => setValue('category', e.value)}
                value={agricCategories.find(
                  option => option.value === watch('category')
                )}
              />
            </div>
            <div>
              <label htmlFor='location' className={labelStyles}>
                Commodity
              </label>
              <Select
                options={cropOptions}
                isMulti
                onChange={e => {
                  const values = e.map(item => item.value);
                  setValue('crops', values);
                }}
                value={cropOptions.filter(opt => {
                  if (watch('crops')?.includes(opt.value)) {
                    return opt;
                  }
                })}
              />
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='status' className={labelStyles}>
                Status
              </label>
              <Select
                options={statusOptions}
                onChange={e => setValue('status', e.value)}
                value={statusOptions.find(
                  option => option.value === watch('status')
                )}
              />
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
                {farmerId ? 'Update Farmer' : 'Add Farmer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFarmer;
