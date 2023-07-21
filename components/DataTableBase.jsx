import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MdClear, MdOutlineSearch } from 'react-icons/md';

const customStyles = {
  rows: {
    style: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      fontSize: '1.05rem',
    },
  },
  headCells: {
    style: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      fontSize: '1.05rem',
    },
  },
};

const SearchBox = ({ onSearch, filterText, setResetPagination }) => {
  const [input, setInput] = useState('');
  const debounce = (functionToCall, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        functionToCall(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(() => {
    onSearch(input);
  }, 500);

  const handleInputChange = event => {
    setInput(event.target.value);
    debouncedSearch();
  };

  const handleClear = () => {
    if (filterText) {
      setResetPagination(true);
      setInput('');
    }
  };

  return (
    <div className='flex flex-row items-center border-[1px] focus:outline-none rounded p-2'>
      <MdOutlineSearch className='mr-1 text-xl text-gray-400' />
      <input
        type='text'
        onChange={handleInputChange}
        value={input}
        className='w-full focus:outline-none'
        placeholder='Search...'
      />
      <MdClear
        className='hidden text-2xl text-red-500 cursor-pointer lg:block hover:scale-125'
        onClick={handleClear}
      />
    </div>
  );
};
function DataTableBase({
  columns,
  data,
  title,
  loading,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  setFilterText,
  filterText,
}) {
  const [resetPagination, setResetPagination] = useState(false);

  return (
    <>
      <div className='flex flex-col justify-between gap-3 px-3 pt-3 mb-5 md:gap-0 md:items-center md:flex-row'>
        <p className='text-2xl font-semibold'>{title}</p>
        <SearchBox
          onSearch={setFilterText}
          filterText={filterText}
          setResetPagination={setResetPagination}
        />
      </div>
      <DataTable
        pagination
        dense
        columns={columns}
        data={data}
        customStyles={customStyles}
        responsive
        paginationResetDefaultPage={resetPagination}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={loading}
        progressComponent={
          <div className='flex flex-row w-full '>
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='flex-1 space-y-4'
            />
          </div>
        }
      />
    </>
  );
}
export default DataTableBase;
