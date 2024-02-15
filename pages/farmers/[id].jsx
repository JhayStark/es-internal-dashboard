import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/router';
import { useTableDataMtn } from '@/hooks/fetchers';
import { TbEdit } from 'react-icons/tb';
import Sales from '../../components/farmers/Sales';
import Link from 'next/link';
import Harvest from '../../components/farmers/Harvest';
import AddFarmer from '@/components/farmers/AddFarmer';

const convertDate = dateString => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
  const day = date.getDate();
  return (
    `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}` ||
    ''
  );
};

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});
const sales = [
  {
    name: 'Quantity',
    selector: row => row.volume,
    sortable: true,
  },
  {
    name: 'Unit',
    selector: row => row.unit,
    sortable: true,
  },
  {
    name: 'Price Per Unit',
    selector: row => row.pricePerUnit,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Commodity',
    selector: row => row.crop,
    sortable: true,
  },
  {
    name: 'Season',
    selector: row => row.year,
    sortable: true,
  },
];

const harvest = [
  {
    name: 'Quantity',
    selector: row => row.volume,
    sortable: true,
  },
  {
    name: 'Unit',
    selector: row => row.unit,
    sortable: true,
  },

  {
    name: 'Commodity',
    selector: row => row.crop,
    sortable: true,
  },
  {
    name: 'Season',
    selector: row => row.year,
    sortable: true,
  },
];
const Page = () => {
  const router = useRouter();
  const farmerId = router.query.id;
  const tabState = router.query.tab || 'sales';
  const addModal = router.query.addModal || false;
  const [farmerData, setFarmerData] = useState({});
  const {
    filterText,
    handlePageChange,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
  } = useTableDataMtn(`/farmers/${farmerId}/harvests`);
  const {
    filterText: salesfilterText,
    handlePageChange: saleshandlePageChange,
    handlePageNumberChange: saleshandlePageNumberChange,
    setFilterText: salessetFilterText,
    tableData: salestableData,
    tableDataIsLoading: salestableDataIsLoading,
  } = useTableDataMtn(`/farmers/${farmerId}/sales`);

  useEffect(() => {
    setFarmerData(JSON.parse(localStorage.getItem('viewData')));
  }, [farmerId]);

  return (
    <div>
      <div className='p-5 bg-white rounded-lg shadow-3xl min-h-[75%] flex flex-row justify-between  '>
        <div className='flex flex-col items-start justify-between h-full'>
          <div className='flex flex-col justify-start'>
            <div className='flex flex-row items-center gap-2'>
              <p className=' text-2xl 3xl:text-3xl font-semibold text-[#2A3547] text-center'>
                {farmerData?.name || (
                  <Skeleton count={1} width={'8rem'} borderRadius={10} />
                )}
              </p>
              <p
                className={` w-14 text-center py-1 rounded-lg text-xs text-gray-600 ${
                  farmerData?.status ? 'bg-yellow-200' : 'bg-green-200'
                }`}
              >
                {farmerData?.status ? 'pending' : 'reviewed'}
              </p>
            </div>
            <p className='text-[#828282] text-sm mt-3'>
              Joined on{' '}
              {convertDate(farmerData?.createdAt) || (
                <Skeleton count={1} width={'8rem'} borderRadius={10} />
              )}
            </p>
          </div>
          <div className='flex flex-col justify-end'>
            <p className='font-medium  text-[#2A3547] '>
              {farmerData.phone || (
                <Skeleton count={1} width={'8rem'} borderRadius={10} />
              )}
            </p>
            <p className='font-medium text-sm text-[#2A3547] '>
              {farmerData ? (
                `${farmerData.district}, ${farmerData.region} - ${farmerData.country}`
              ) : (
                <Skeleton count={1} width={'8rem'} borderRadius={10} />
              )}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-end justify-between'>
          <Link href={`/farmers/${farmerId}?addModal=edit`}>
            <TbEdit className='text-2xl text-orange-400 cursor-pointer hover:scale-110' />
          </Link>
          <div className='space-x-2'>
            <Link
              className='p-2 text-white bg-blue-500 rounded'
              href={`/farmers/${farmerId}?addModal=harvest&tab=harvest`}
            >
              Add Harvest
            </Link>
            <Link
              className='p-2 text-white bg-green-500 rounded'
              href={`/farmers/${farmerId}?addModal=sale&tab=sales`}
            >
              Add Sale
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-white my-8 grid text-lg sm:text-xl  grid-cols-2 rounded-lg shadow-3xl sm:w-[50%] max-w-md'>
        <button
          className={`text-center  font-medium rounded-lg py-2 cursor-pointer ${
            tabState === 'sales' && 'bg-[#3D7DAD] text-white'
          }`}
          onClick={() => router.push(`/farmers/${farmerId}?tab=sales`)}
        >
          Sales
        </button>

        <button
          className={`text-center  font-medium rounded-lg py-2 cursor-pointer ${
            tabState === 'harvest' && 'bg-[#F24E1E] text-white'
          }`}
          onClick={() => router.push(`/farmers/${farmerId}?tab=harvest`)}
        >
          Harvest
        </button>
      </div>
      <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl '>
        {tabState === 'sales' ? (
          <NoSSRTable
            data={salestableData?.data}
            columns={sales}
            title='Sales'
            loading={salestableDataIsLoading}
            totalRows={salestableData?.totalRowCount}
            handlePerRowsChange={saleshandlePageNumberChange}
            setFilterText={salessetFilterText}
            filterText={salesfilterText}
            handlePageChange={saleshandlePageChange}
            setUploadModalState={() => 'void'}
            setFarmerFilterModalState={() => 'void'}
          />
        ) : (
          <NoSSRTable
            data={tableData?.data}
            columns={harvest}
            title='Harvest'
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
            handlePageChange={handlePageChange}
            setUploadModalState={() => 'void'}
            setFarmerFilterModalState={() => 'void'}
          />
        )}
      </div>
      {addModal === 'sale' && (
        <Sales
          close={() =>
            router.push('/farmers/f95a334b-b0ca-432e-a2c8-bf15896fd52d')
          }
        />
      )}
      {addModal === 'harvest' && (
        <Harvest
          close={() =>
            router.push('/farmers/f95a334b-b0ca-432e-a2c8-bf15896fd52d')
          }
        />
      )}

      {addModal === 'edit' && (
        <AddFarmer
          close={() =>
            router.push('/farmers/f95a334b-b0ca-432e-a2c8-bf15896fd52d')
          }
        />
      )}
    </div>
  );
};

export default Page;
