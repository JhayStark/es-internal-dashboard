import React from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const ViewList = ({
  advice,
  setAdvice,
  setAudioFiles,
  reset,
  setAddNew,
  viewSelectedAdvice,
  defaultValues,
}) => {
  return (
    <div className='h-full '>
      <div className='flex items-center justify-between'>
        <p>Total Sent: {`${advice?.data.length}`}</p>
        <button
          className='p-1 text-sm font-medium text-white bg-green-400 rounded round'
          onClick={() => {
            setAdvice('');
            setAudioFiles([]);
            reset(defaultValues);
            setAddNew(true);
          }}
        >
          Add New
        </button>
      </div>
      <div className='max-h-[80vh] h-full py-2 space-y-4 overflow-y-auto '>
        {advice?.data?.map(item => (
          <div className='p-3 rounded shadow-md bg-blue-50' key={item.id}>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>
                  Targert Group : {`${item['farmer_type']}(${item.commodity})`}
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
        {advice?.data?.length === 0 && (
          <div className='flex items-center justify-center min-h-full '>
            <p className='text-lg font-medium text-gray-400'>
              {' '}
              No climate advice added
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewList;
