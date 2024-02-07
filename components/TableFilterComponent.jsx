import React from 'react';

const TableFilterComponent = ({
  options,
  onChangeHandler,
  selectedOptions,
  setDateRange,
}) => {
  return (
    <div className='px-3 py-4 bg-[#f1f6ff] rounded-md shadow-xl'>
      <div className='flex flex-col gap-5 md:gap-10 md:flex-row'>
        <div>
          <p className='mb-1 text-sm'>From:</p>
          <input
            type='date'
            name='from'
            id='from'
            className='px-2 focus:outline-none bg-inherit border-b-[2px] pb-1'
            onChange={e =>
              setDateRange(prev => {
                prev.startDate = e.target.value;
                return prev;
              })
            }
          />
        </div>
        <div>
          <p className='mb-1 text-sm'>To:</p>
          <input
            type='date'
            name='to'
            id='to'
            className='px-2 focus:outline-none bg-inherit border-b-[2px] pb-1'
            onChange={e =>
              setDateRange(prev => {
                prev.endDate = e.target.value;
                return prev;
              })
            }
          />
        </div>
      </div>

      <div className='grid grid-cols-2 mt-4'>
        {options?.map(option => (
          <div className='flex flex-row items-center gap-2' key={option}>
            <input
              type='checkbox'
              name={option}
              id={option}
              value={option}
              onChange={e => {
                if (selectedOptions?.includes(e.target.value)) {
                  onChangeHandler(prev =>
                    prev.filter(item => item !== e.target.value)
                  );
                } else {
                  onChangeHandler(prev => [...prev, e.target.value]);
                }
              }}
              checked={selectedOptions?.includes(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <button
        className='mt-2 ml-auto mr-0 text-sm text-red-400 '
        onClick={() => onChangeHandler(prev => [])}
      >
        Clear
      </button>
    </div>
  );
};

export default TableFilterComponent;
