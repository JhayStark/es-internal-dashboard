import React, { useState, memo } from 'react';
import { MdClear, MdOutlineSearch } from 'react-icons/md';
import DataTable from 'react-data-table-component';

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

const SearchBox = ({ onSearch, filterText, clear }) => {
  return (
    <div className='flex flex-row items-center border-[1px] focus:outline-none rounded p-2'>
      <MdOutlineSearch className='mr-1 text-xl text-gray-400' />
      <input
        type='text'
        onChange={e => onSearch(e.target.value)}
        value={filterText}
        className=' focus:outline-none'
        placeholder='Search...'
      />
      <MdClear
        className='text-2xl text-red-500 cursor-pointer hover:scale-125'
        onClick={clear}
      />
    </div>
  );
};
function DataTableBase({ columns, data, searchParameter, title }) {
  const [filterText, setFilterText] = useState('');
  const [resetPagination, setResetPagination] = useState(false);
  const filteredItems = data.filter(
    item =>
      item[searchParameter] &&
      item[searchParameter].toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPagination(true);
      setFilterText('');
    }
  };

  return (
    <>
      <div className='flex flex-col justify-between gap-3 px-3 pt-3 mb-5 md:gap-0 md:items-center md:flex-row'>
        <p className='text-2xl font-semibold'>{title}</p>
        <SearchBox
          onSearch={setFilterText}
          filterText={filterText}
          clear={handleClear}
        />
      </div>
      <DataTable
        pagination
        dense
        columns={columns}
        data={filteredItems}
        customStyles={customStyles}
        responsive
        paginationResetDefaultPage={resetPagination}
      />
    </>
  );
}
export default DataTableBase;
