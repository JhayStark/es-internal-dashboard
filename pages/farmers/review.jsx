import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import AddFarmer from '@/components/farmers/AddFarmer';
import { useRouter } from 'next/router';
import { useTableDataMtn } from '@/hooks/fetchers';
import { LuFileEdit } from 'react-icons/lu';
import { AiOutlineEye } from 'react-icons/ai';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const farmerTableColumns = [
  {
    name: 'Name',
    selector: row => row.name,

    sortable: true,
  },
  {
    name: 'Location',
    selector: row => row.community,
    sortable: true,
  },
  {
    name: 'Category',
    selector: row => row.category,
    sortable: true,
  },
  {
    name: 'Contact',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    cell: row => (
      <p
        className={` w-16 text-center py-1 rounded-lg text-xs text-gray-600 ${
          row.status === 'pending' ? 'bg-yellow-200' : 'bg-green-200'
        }`}
      >
        {row.status}
      </p>
    ),
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => {
      const rowData = JSON.stringify(row);
      const viewData = () => {
        localStorage.setItem('viewData', rowData);
      };
      return (
        <div className='flex items-center gap-2 text-2xl'>
          <Link
            href={`/farmers/review?addFarmer=true&farmerId=${row.id}&rowData=${rowData}`}
          >
            <LuFileEdit className='text-orange-300 cursor-pointer hover:scale-110' />
          </Link>
          <Link href={`/farmers/${row.id}`}>
            <AiOutlineEye className='text-[#699BF7] cursor-pointer hover:scale-110' />
          </Link>
        </div>
      );
    },
    center: true,
  },
];

const Review = () => {
  const router = useRouter();
  const query = router.query;
  const {
    filterText,
    handlePageChange,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
  } = useTableDataMtn('/farmers');

  return (
    <div>
      <ReportsNavigationTab
        routes={[
          { route: '/farmers', title: 'Farmers' },
          { route: '/farmers/review', title: 'New Farmers' },
        ]}
      />
      <div className='flex items-center justify-end w-full p-2 '>
        <button
          className='p-2 font-medium text-white bg-blue-700 rounded hover:scale-90'
          type='button'
          onClick={() => router.push('/farmers/review?addFarmer=true')}
        >
          Add Farmer
        </button>
      </div>
      <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl '>
        <NoSSRTable
          data={tableData?.data || []}
          columns={farmerTableColumns}
          title='Farmer Profiles'
          loading={tableDataIsLoading}
          totalRows={tableData?.totalRowCount}
          handlePerRowsChange={handlePageNumberChange}
          setFilterText={setFilterText}
          filterText={filterText}
          handlePageChange={handlePageChange}
          farmerTable
          setUploadModalState={() => 'void'}
          setFarmerFilterModalState={() => 'void'}
        />
      </div>
      {query.addFarmer && (
        <AddFarmer
          modalState={query.addFarmer}
          close={() => router.push('/farmers/review')}
        />
      )}
    </div>
  );
};

export default Review;
