import AreaGraph from '@/components/AreaGraph';
import PieChartComponent from '@/components/PieChart';
import dynamic from 'next/dynamic';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import { useTableData, useServiceStatistics } from '@/hooks/fetchers';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const transactionTableColumns = [
  {
    name: 'Transaction ID',
    selector: row => row.transactionId,
  },
  {
    name: 'Client Name',
    selector: row => row.clientName,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.transactionDate,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    cell: row => (
      <>
        <p
          className={`${
            row.status
              ? 'text-green-500 bg-green-200 '
              : 'text-red-500 bg-red-200'
          } rounded-md px-2 text-sm`}
        >
          {row.status ? 'Approved' : 'Failed'}
        </p>
      </>
    ),
  },
  {
    name: 'Service',
    selector: row => row.service,
    sortable: true,
  },
];
const Index = () => {
  const {
    tableData,
    tableDataIsLoading,
    filterText,
    setFilterText,
    handlePageNumberChange,
  } = useTableData('/reports/transactions');

  const { serviceStatistics } = useServiceStatistics();

  return (
    <>
      <ReportsNavigationTab />
      <div className='grid grid-cols-7 gap-3 3xl:gap-5 mb-9'>
        <div className='hidden col-span-7 p-4 bg-white rounded-lg sm:block lg:col-span-5 shadow-3xl '>
          <p className='py-2 text-xl font-bold '>Revenue Per Qtr</p>
          <div className=' h-80'>
            <AreaGraph data={tableData?.revenuePerQtr} />
          </div>
        </div>
        <div className='hidden p-4 bg-white rounded-lg lg:block lg:col-span-2 shadow-3xl '>
          <p className='text-xl font-bold'>Monthly Service Usage</p>
          <PieChartComponent />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#214BB8]'></div>
              <p className='text-lg font-semibold'>
                {serviceStatistics ? serviceStatistics['Insyt'] : ''}
              </p>
              <p className='text-sm text-[#7E7E7E]'>Surveys</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#FE634E]'></div>
              <p className='text-lg font-semibold'>
                {serviceStatistics ? serviceStatistics['Sms'] : ''}
              </p>
              <p className='text-sm text-[#7E7E7E]'>SMS</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#45ADDA]'></div>
              <p className='text-lg font-semibold'>
                {serviceStatistics ? serviceStatistics['Voice'] : ''}
              </p>
              <p className='text-sm text-[#7E7E7E]'>Voice</p>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 my-10 bg-white rounded-lg shadow-3xl'>
        <NoSSRTable
          data={tableData?.paginatedData}
          columns={transactionTableColumns}
          title='Total Transactions'
          loading={tableDataIsLoading}
          totalRows={tableData?.totalRowCount}
          handlePerRowsChange={handlePageNumberChange}
          setFilterText={setFilterText}
          filterText={filterText}
        />
      </div>
    </>
  );
};

export default Index;
