import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AgroSmartNavigationTab from '../../components/AgroSmartNavigationTab';
import AddMarketPriceForm from '../../components/AddMarketPriceForm';
import { useMarketPrices, useMarkets } from '@/hooks/fetchers';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const pricesColumns = [
  {
    name: 'Commodity',
    selector: row => row['commodity'],
    sortable: true,
  },
  {
    name: 'Market',
    selector: row => row['market'],
    sortable: true,
  },
  {
    name: 'Wholesale Price',
    selector: row => row['wholesale_price'],
    sortable: true,
  },
  {
    name: 'Retail Price',
    selector: row => row['retail_price'],
    sortable: true,
  },
  {
    name: 'Date Recorded',
    selector: row => (
      <p>{new Date(row['date_recorded']).toLocaleDateString()}</p>
    ),
  },
];

const generateMarketsOptions = markets => {
  const options = markets?.map(market => market.city);
  return [...new Set(options)];
};

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    filterText,
    handlePageChange,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
    setLocation,
  } = useMarketPrices();
  const { markets } = useMarkets();

  return (
    <div className='box-border'>
      <AgroSmartNavigationTab />
      <div className='flex justify-end'>
        <button
          className='p-2 text-sm font-medium text-white bg-green-500 rounded-md shadow '
          onClick={() => setOpenModal(true)}
        >
          Add Market Price
        </button>
      </div>
      <div className='p-4 mt-2 bg-white rounded-lg shadow-3xl '>
        <NoSSRTable
          data={tableData?.data}
          columns={pricesColumns}
          loading={tableDataIsLoading}
          totalRows={tableData?.totalRowCount}
          handlePerRowsChange={handlePageNumberChange}
          setFilterText={setFilterText}
          filterText={filterText}
          handlePageChange={handlePageChange}
          options={generateMarketsOptions(markets)}
          title='Market Prices'
          onChangeHandler={setLocation}
        />
      </div>
      {openModal && <AddMarketPriceForm setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Index;
