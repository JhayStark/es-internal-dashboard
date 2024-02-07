import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TableFilterComponent from './TableFilterComponent';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useEffect, useState, useRef } from 'react';
import { MdClear, MdOutlineSearch } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiFilterAlt } from 'react-icons/bi';
import { useDebounce } from 'use-debounce';

const customStyles = {
  rows: {
    style: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      fontSize: '0.9rem',
    },
  },
  headCells: {
    style: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      fontSize: '1rem',
    },
  },
  table: { style: { maxHeight: 700, overflow: 'auto', minHeight: 300 } },
};

const SearchBox = ({ onSearch, setResetPagination }) => {
  const [input, setInput] = useState('');
  const [searchValue] = useDebounce(input, 1000);

  const handleClear = () => {
    setResetPagination(true);
    setInput('');
  };

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <div className='flex flex-row items-center border-[1px] focus:outline-none rounded-md p-2 '>
      <MdOutlineSearch className='mr-1 text-xl text-gray-400' />
      <input
        type='text'
        onChange={e => setInput(e.target.value)}
        value={input}
        className='w-full focus:outline-none'
        placeholder='Search...'
      />
      {input.length > 0 && (
        <MdClear
          className='hidden text-2xl text-red-500 cursor-pointer lg:block hover:scale-125'
          onClick={handleClear}
        />
      )}
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
  hidden,
  farmerTable,
  setUploadModalState,
  options,
  setFarmerFilterModalState,
  onChangeHandler,
  selectedOptions,
  setDateRange,
}) {
  const filterDropDownRef = useRef();
  const [resetPagination, setResetPagination] = useState(false);
  const [uploadTextShow, setUploadTextShow] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const closeFilterDropdown = () => {
    setShowFilterDropdown(false);
  };

  useOutsideClick(closeFilterDropdown, filterDropDownRef);
  return (
    <>
      <div className='flex flex-col justify-between gap-3 px-3 pt-2 md:gap-0 md:items-center md:flex-row'>
        <p className='text-lg antialiased font-medium '>{title}</p>
        {!hidden && (
          <div className='flex flex-row items-center gap-2'>
            <SearchBox
              onSearch={setFilterText}
              filterText={filterText}
              setResetPagination={setResetPagination}
            />
            {farmerTable && (
              <div className='relative'>
                <AiOutlineCloudUpload
                  onClick={() => setUploadModalState(prev => !prev)}
                  className='p-1 text-3xl text-white rounded-md cursor-pointer bg-primary hover:scale-110'
                  onMouseEnter={() => setUploadTextShow(true)}
                  onMouseLeave={() => setUploadTextShow(false)}
                />
                <p
                  className={`absolute z-50  bg-green-500 rounded-md p-1 text-white text-sm mt-1 w-[90px] ${
                    uploadTextShow ? 'block' : 'hidden'
                  }`}
                >
                  Upload File
                </p>
              </div>
            )}
            <div className='relative' ref={filterDropDownRef}>
              <BiFilterAlt
                className='p-1 text-3xl antialiased shadow text-white bg-[#c9a72b] rounded-md cursor-pointer hover:scale-110 '
                onClick={() => {
                  if (!farmerTable) setShowFilterDropdown(prev => !prev);
                  if (farmerTable) setFarmerFilterModalState(prev => !prev);
                }}
              />
              {!farmerTable && showFilterDropdown && (
                <div className='absolute right-0 z-50 mt-3'>
                  <TableFilterComponent
                    options={options}
                    onChangeHandler={onChangeHandler}
                    selectedOptions={selectedOptions}
                    setDateRange={setDateRange}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <DataTable
        pagination
        columns={columns}
        data={data}
        customStyles={customStyles}
        responsive='true'
        paginationResetDefaultPage={resetPagination}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={loading}
        progressComponent={
          <div className='flex flex-row w-full mt-3'>
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
              containerClassName='md:flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='md:flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='lg:flex-1 space-y-4'
            />
            <Skeleton
              count={10}
              width={'90%'}
              borderRadius={10}
              containerClassName='lg::flex-1 space-y-4'
            />
          </div>
        }
      />
    </>
  );
}
export default DataTableBase;
