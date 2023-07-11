import { RiVoiceprintLine } from 'react-icons/ri';
import { TbMessageDots } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import dynamic from 'next/dynamic';
import { recentPayments } from '../dummyData';

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
        <div className=' text-[#D27C2C] text-3xl'>{icon}</div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-light lg:text-base '>Updated 30mins ago</p>
        <p className='text-[#055189] text-2xl'>{value}</p>
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
    selector: row => row.date,
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

export default function Home() {
  return (
    <>
      <div className='font-sans '>
        <div className='grid md:grid-cols-3 gap-[1.4rem] mb-8 lg:mb-14 '>
          <StatsOverview
            title='Push (Voice)'
            icon={<RiVoiceprintLine />}
            value='5000'
          />
          <StatsOverview
            title='Push (SMS)'
            icon={<TbMessageDots />}
            value='5000'
          />
          <StatsOverview
            title='Insyt (Forms)'
            icon={<CgNotes />}
            value={5000}
          />
        </div>
        <div className='p-4 bg-white rounded-lg shadow-3xl '>
          <NoSSRTable
            data={recentPayments}
            columns={recentPaymentsColumns}
            searchParameter='clientName'
            title='Recent Payments'
          />
        </div>
      </div>
    </>
  );
}
