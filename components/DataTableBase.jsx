import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import { MdClear, MdOutlineSearch } from 'react-icons/md';

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
};

const SearchBox = ({ onSearch, setResetPagination }) => {
  const [input, setInput] = useState('');

  const handleClear = () => {
    setResetPagination(true);
    setInput('');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(input);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [input, 500]);

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
  hidden,
}) {
  const [resetPagination, setResetPagination] = useState(false);

  return (
    <>
      <div className='flex flex-col justify-between gap-3 px-3 pt-2 md:gap-0 md:items-center md:flex-row'>
        <p className='text-lg font-medium xl:text-xl 3xl:text-2xl'>{title}</p>
        {!hidden && (
          <SearchBox
            onSearch={setFilterText}
            filterText={filterText}
            setResetPagination={setResetPagination}
          />
        )}
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
