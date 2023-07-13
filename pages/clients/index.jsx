import { FaUsers, FaUserSlash } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { userList } from '../../dummyData';
import PieChartComponent from '@/components/PieChart';
import dynamic from 'next/dynamic';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const ClientStatsOverview = ({ title, icon, color }) => {
  return (
    <div className='flex flex-col gap-16 p-4 bg-white rounded-lg shadow-3xl'>
      <div className='flex items-center justify-between'>
        <p className='xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium'>
          {title}
        </p>
        <div className={` text-[${color}] text-4xl p-1 rounded-lg`}>{icon}</div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='font-light'>Updated 30mins ago</p>
        <p className='text-[#055189] text-2xl'>5000</p>
      </div>
    </div>
  );
};

const Clients = () => {
  const router = useRouter();

  const columns = [
    {
      name: 'Joined Date',
      selector: 'joinedDate',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'organizationName',
      sortable: true,
    },
    {
      name: 'Sms Balance',
      selector: 'smsBalance',
      cell: row => <p>{row.smsBalance}</p>,
      center: true,
    },
    {
      name: 'Forms',
      selector: 'activeForms',
      sortable: true,
      cell: row => <p>{row.activeForms}</p>,
      center: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className=' text-2xl text-[#699BF7] cursor-pointer'>
          <AiOutlineEye onClick={() => router.push('/clients/1')} />
        </div>
      ),
      center: true,
    },
  ];
  return (
    <>
      <div className='grid grid-cols-3 gap-[1.4rem] mb-14 '>
        <ClientStatsOverview
          title='Total Users'
          icon={<FaUsers />}
          color='#D27C2C'
        />
        <ClientStatsOverview
          title='Active Users'
          icon={<AiOutlineCheckCircle />}
          color='#0FA958'
        />
        <ClientStatsOverview
          title='Disabled Users'
          icon={<FaUserSlash />}
          color='#F24E1E'
        />
      </div>
      <div className='grid grid-cols-3 gap-[1.4rem] mb-14 '>
        <div className='p-4 bg-white rounded-lg shadow-3xl max-h-[25rem] 3xl:px-7'>
          <p className='xl:text-[1.030rem] 2xl:text-[1.174rem] 3xl:text-[1.493rem]  font-semibold'>
            Services Used
          </p>
          <PieChartComponent />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#214BB8]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>insyt</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#FE634E]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Sms</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#45ADDA]'></div>
              <p className='text-lg font-semibold'>2250</p>
              <p className='text-sm text-[#7E7E7E]'>Voice</p>
            </div>
          </div>
        </div>
        <div className='h-full col-span-2 p-4 bg-white rounded-lg shadow-3xl '>
          <NoSSRTable
            title='User List'
            searchParameter='organizationName'
            data={userList}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default Clients;
