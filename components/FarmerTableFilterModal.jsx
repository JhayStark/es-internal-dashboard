import React, { useRef } from 'react';

const categories = [
  'Specialized Crop',
  'LiveStock',
  'Aquaculture',
  'Agroforestry',
  'Mixed Farming',
  'Beekeeping',
  'Horticulture',
  'Mixed Crop',
];

const FilterMenu = ({ title, options }) => {
  return (
    <div className='mb-7'>
      <p className='text-lg font-medium'>{title}</p>
      <div className='grid grid-cols-2 gap-2 text-gray-600 md:grid-cols-4'>
        {options?.map(option => (
          <div className='flex flex-row items-center gap-2'>
            <input type='checkbox' name={option} id={option} value={option} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const FarmerTableFilterModal = ({ modalState, closeModal }) => {
  const modalRef = useRef();

  const outsideClick = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };
  return (
    <div>
      {modalState && (
        <div
          onClick={outsideClick}
          className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans '
        >
          <div
            ref={modalRef}
            className=' min-w-[30%] max-h-[90vh] flex flex-col p-4 mx-auto bg-white rounded-lg shadow-lg'
          >
            <div className='text-gray-600 mb-7'>
              <p className='text-lg font-medium text-black'>Gender</p>
              <div className='flex flex-row items-center gap-2'>
                <div className='flex flex-row items-center gap-2'>
                  <input type='checkbox' name='male' id='male' value='male' />
                  <label htmlFor='male'>Male</label>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <input
                    type='checkbox'
                    name='female'
                    id='female'
                    value='female'
                  />
                  <label htmlFor='female'>Female</label>
                </div>
              </div>
            </div>
            <FilterMenu title='Districts' options={categories} />
            <FilterMenu title='Region' options={categories} />
            <FilterMenu title='Networks' options={categories} />
            <button className='self-end px-3 py-1 mr-5 text-white bg-[#055189] rounded-md hover:scale-110'>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerTableFilterModal;
