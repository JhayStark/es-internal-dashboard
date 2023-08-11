import dynamic from 'next/dynamic';
import StatsOverview from '../components/StatsOverView';
import { useServiceTotals, useTableData } from '../hooks/fetchers';
import { RiVoiceprintLine } from 'react-icons/ri';
import { TbMessageDots } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const recentPaymentsColumns = [
  {
    name: 'Transaction ID',
    selector: row => row['transactionId'],
  },
  {
    name: 'Client Name',
    selector: row => row['clientName'],
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row['transactionDate'],
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row['amount'],
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row['status'],
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
  const { serviceTotals } = useServiceTotals();
  const {
    tableData,
    tableDataIsLoading,
    filterText,
    setFilterText,
    handlePageNumberChange,
    handlePageChange,
  } = useTableData('/reports/transactions');

  return (
    <>
      <div className='font-sans '>
        <div className='grid md:grid-cols-3 gap-[1.4rem] mb-6 '>
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
            data={tableData?.paginatedData}
            columns={recentPaymentsColumns}
            title='Recent Payments'
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
}
