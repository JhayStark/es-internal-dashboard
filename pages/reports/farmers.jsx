import React from 'react';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import dynamic from 'next/dynamic';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';
import { useTableData } from '@/hooks/fetchers';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const FarmerOverviewStats = ({ title, icon, value }) => {
  return (
    <div className='flex flex-col p-5 bg-white rounded-lg gap-9 shadow-3xl'>
      <p className='text-xl font-medium'>{title}</p>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-lg'>{value}</p>
        <div className='text-5xl'>{icon}</div>
      </div>
    </div>
  );
};
const Farmers = () => {
  const {
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
  } = useTableData(
    'https://internal-manager-api.onrender.com/api/reports?type=farmers',
    true
  );
  const farmerTableColumns = [
    {
      name: 'Name',
      selector: row => row.name,

      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Network',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
    },
  ];
  return (
    <div>
      <ReportsNavigationTab />
      <div className='flex flex-row items-center mb-2 '>
        <p className='text-xl font-medium'>Select Country:</p>
        <select
          name=''
          id=''
          className='px-1 text-lg ml-2 rounded-xl bg-[#e3c24a] focus:outline-none'
        >
          <option value=''>Ghana</option>
        </select>
      </div>
      <div className='hidden grid-cols-4 font-sans lg:gap-8 lg:grid'>
        <FarmerOverviewStats
          title='All Countries'
          icon={<FaGlobeAfrica className='text-[#073150]' />}
          value={tableData?.countriesCovered}
        />
        <FarmerOverviewStats
          title='Female Farmers'
          icon={<BiFemale className='text-[#85B6FF]' />}
          value={tableData?.totalFemaleFarmers}
        />
        <FarmerOverviewStats
          title='Male Farmers'
          icon={<BiMale className='text-[#FFD233]' />}
          value={tableData?.totalMaleFarmers}
        />
        <FarmerOverviewStats
          title='Total Farmers'
          icon={<GiFarmTractor className='text-[#4ECB71]' />}
          value={tableData?.totalFemaleFarmers + tableData?.totalMaleFarmers}
        />
      </div>
      <div className='grid grid-cols-4 gap-8 mt-5 font-sans'>
        <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl'>
          <NoSSRTable
            data={tableData?.paginatedData}
            columns={farmerTableColumns}
            title='Farmer Profiles'
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
          />
        </div>
        <div className='flex-col items-center hidden px-8 overflow-y-auto bg-white rounded-lg lg:flex shadow-3xl'>
          <p className='sticky top-0 py-3 text-lg font-medium text-center bg-white '>
            Regional Distribution of Farmers
          </p>
          <div className='flex flex-col gap-2 pt-2 pb-4'>
            <div className='grid w-full grid-cols-2 py-2 '>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Eastern</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Ahafo</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Eastern</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Ahafo</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Eastern</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Ahafo</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Eastern</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Ahafo</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Eastern</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Ahafo</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
            <div className='grid w-full grid-cols-2 py-2'>
              <p className='text-lg text-left text-[#214BB8]'>Greater Accra</p>
              <p className='text-xl font-medium text-right'>515,123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmers;
