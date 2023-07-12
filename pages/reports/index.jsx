import AreaGraph from '@/components/AreaGraph';
import PieChartComponent from '@/components/PieChart';
import { StatsTabOption1, StatsTabOption2 } from '@/components/StatsTab';
import { IoIosPeople } from 'react-icons/io';
import { AiOutlineForm } from 'react-icons/ai';
import { RiMessage2Line, RiVoiceprintLine } from 'react-icons/ri';
import Table from '@/components/Table';
import DataTableBase from '@/components/DataTableBase';
import dynamic from 'next/dynamic';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';

const NoSSRTabale = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const Index = () => {
  const transactionTableColumns = [
    {
      name: 'Transaction ID',
      selector: row => row.transactionId,
      sortable: true,
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
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
    },
    {
      name: 'Service',
      selector: row => row.service,
      sortable: true,
    },
  ];
  return (
    <>
      <ReportsNavigationTab />
      <div className='grid grid-cols-7 gap-3 3xl:gap-5 mb-9'>
        <div className='col-span-5 p-4 bg-white rounded-lg shadow-3xl'>
          <p className='py-2 text-xl font-bold'>Revenue Per Qtr</p>
          <div className='h-80'>
            <AreaGraph />
          </div>
        </div>
        <div className='col-span-2 p-4 bg-white rounded-lg shadow-3xl '>
          <p className='text-xl font-bold'>Monthly Service Usage</p>
          <PieChartComponent />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#214BB8]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Insyt Forms</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#FE634E]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>SMS</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#45ADDA]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Voice</p>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 my-10 bg-white rounded-lg shadow-3xl'>
        <NoSSRTabale
          title='Total Transactions'
          searchParameter='clientName'
          columns={transactionTableColumns}
          data={[
            {
              clientName: 'Turner and Sons',
              date: '4/4/2023',
              status: 'Failed',
              amount: '$1992.81',
              id: 1,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Connelly-Conroy',
              date: '7/8/2022',
              status: 'Failed',
              amount: '$2163.12',
              id: 2,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Jacobs, Mayer and Kunde',
              date: '5/19/2023',
              status: 'Completed',
              amount: '$6765.84',
              id: 3,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Bailey-Robel',
              date: '7/15/2022',
              status: 'Failed',
              amount: '$7376.48',
              id: 4,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Effertz and Sons',
              date: '10/2/2022',
              status: 'Failed',
              amount: '$902.27',
              id: 5,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Schamberger, Jones and Reichel',
              date: '8/22/2022',
              status: 'Completed',
              amount: '$8397.68',
              id: 6,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Weimann and Sons',
              date: '6/10/2023',
              status: 'Failed',
              amount: '$6111.18',
              id: 7,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Bartell and Sons',
              date: '8/14/2022',
              status: 'Completed',
              amount: '$1450.06',
              id: 8,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Emard-Volkman',
              date: '7/3/2022',
              status: 'Failed',
              amount: '$4346.60',
              id: 9,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Bartell, Runolfsson and Kessler',
              date: '6/21/2023',
              status: 'Completed',
              amount: '$5250.44',
              id: 10,
              service: 'Push',
              transactionId: 'TID 245',
            },
            {
              clientName: 'Barton Group',
              date: '3/8/2023',
              status: 'Completed',
              amount: '$6049.85',
              id: 11,
              service: 'Push',
              transactionId: 'TID 245',
            },
          ]}
        />
      </div>
    </>
  );
};

export default Index;
