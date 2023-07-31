import PieChartComponent from '@/components/PieChart';
import dynamic from 'next/dynamic';
import StatsOverView from '@/components/StatsOverView';
import { FaUsers, FaUserSlash } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useTableData, useServiceTotals } from '../../hooks/fetchers';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const Clients = () => {
  const router = useRouter();
  const {
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
    handlePageChange,
  } = useTableData('https://internal-manager-api.onrender.com/api/clients');
  const { serviceTotals } = useServiceTotals();

  const columns = [
    {
      name: 'Joined',
      selector: row => row['dateJoined'],
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row['clientName'],
      sortable: true,
    },
    {
      name: 'Balance',
      selector: row => row['smsBalance'],
      center: true,
    },
    {
      name: 'Forms',
      selector: row => row['totalForms'],
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className=' text-2xl text-[#699BF7] cursor-pointer'>
          <AiOutlineEye
            onClick={() => router.push(`/clients/${row.clientId}`)}
          />
        </div>
      ),
      center: true,
    },
  ];

  return (
    <>
      <div className='grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 gap-[1.4rem] mb-6 '>
        <StatsOverView
          title='Total Clients'
          icon={<FaUsers />}
          color='#D27C2C'
          value={serviceTotals?.totalUsers}
        />
        <StatsOverView
          title='Active Clients'
          icon={<AiOutlineCheckCircle />}
          color='#0FA958'
          value={serviceTotals?.activeUsers}
        />
        <StatsOverView
          title='Disabled Clients'
          icon={<FaUserSlash />}
          color='#F24E1E'
          value={serviceTotals?.deletedUsers}
        />
      </div>
      <div className='grid grid-cols-3 gap-[1.4rem] mb-14 '>
        <div className='p-4 hidden lg:block bg-white rounded-lg shadow-3xl max-h-[25rem] 3xl:px-7'>
          <p className='xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem]  font-medium'>
            Services Used
          </p>
          <PieChartComponent />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#214BB8]'></div>
              <p className='text-lg font-medium'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Surveys</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#FE634E]'></div>
              <p className='text-lg font-medium'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Sms</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#45ADDA]'></div>
              <p className='text-lg font-medium'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Voice</p>
            </div>
          </div>
        </div>
        <div className='h-full col-span-3 p-4 bg-white rounded-lg lg:col-span-2 shadow-3xl '>
          <NoSSRTable
            title='Clients'
            searchParameter='clientName'
            data={tableData?.paginatedData}
            columns={columns}
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Clients;
