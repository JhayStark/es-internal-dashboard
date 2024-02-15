import { useEffect } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useFarmerTypes } from '@/hooks/fetchers';

const AddNew = ({
  submit,
  register,
  selectedAdvice,
  setAddNew,
  setShowVoiceModal,
  watch,
  isLoading,
  commodities,
  setCommodities,
}) => {
  const { farmerTypes } = useFarmerTypes();

  useEffect(() => {
    farmerTypes?.filter(type => {
      if (type.type === watch('farmer_type')) {
        setCommodities(type.commodities);
        return type.type === watch('farmer_type');
      }
    });
  }, [watch('farmer_type')]);
  return (
    <form className='flex flex-col h-full' onSubmit={submit}>
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
            className='px-3 py-2 text-sm text-white bg-red-400 rounded shadow '
            type='button'
            onClick={() => setAddNew(false)}
          >
            Cancel
          </button>
          <button
            className='px-3 py-2 text-sm text-white bg-green-500 rounded shadow '
            type='submit'
          >
            {isLoading ? 'Loading...' : selectedAdvice ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNew;
