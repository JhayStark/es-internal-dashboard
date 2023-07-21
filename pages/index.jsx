import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useServiceTotals, useTableData } from '../hooks/fetchers';
import { RiVoiceprintLine } from 'react-icons/ri';
import { TbMessageDots } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const StatsOverview = ({ title, icon, value }) => {
  return (
    <div className='flex flex-col gap-8 p-4 bg-white rounded-lg lg:gap-16 shadow-3xl'>
      <div className='flex items-center justify-between'>
        <p className='xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium'>
          {title}
        </p>
        <div className=' text-[#D27C2C] text-3xl 3xl:text-4xl'>{icon}</div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-light lg:text-base '>Updated 30mins ago</p>
        <p className='text-[#055189] text-2xl'>
          {value || <Skeleton count={1} width={'8rem'} borderRadius={10} />}
        </p>
      </div>
    </div>
  );
};

const recentPaymentsColumns = [
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
    selector: row => `₵ ${row.amount}`,
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

export default function Home() {
  const { serviceTotals } = useServiceTotals(
    `https://internal-manager-api.onrender.com/api/reports?type=service-total`
  );
  const {
    tableData,
    tableDataIsLoading,
    filterText,
    setFilterText,
    handlePageNumberChange,
  } = useTableData(
    'https://internal-manager-api.onrender.com/api/reports?type=transactions'
  );

  return (
    <>
      <div className='font-sans '>
        <div className='grid md:grid-cols-3 gap-[1.4rem] mb-6 lg:mb-6s '>
          <StatsOverview
            title='Voice'
            icon={<RiVoiceprintLine />}
            value={serviceTotals?.push.totalVoiceMessages}
          />
          <StatsOverview
            title='SMS'
            icon={<TbMessageDots />}
            value={serviceTotals?.push.totalSMSMessages}
          />
          <StatsOverview
            title='Surverys'
            icon={<CgNotes />}
            value={serviceTotals?.activeForms}
          />
        </div>
        <div className='p-4 bg-white rounded-lg shadow-3xl '>
          <NoSSRTable
            data={tableData?.transactions}
            columns={recentPaymentsColumns}
            title='Recent Payments'
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
          />
        </div>
      </div>
    </>
  );
}
