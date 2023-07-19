import React from 'react';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const NoSSRTabale = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const FarmerOverviewStats = ({ title, icon }) => {
  return (
    <div className='flex flex-col p-5 bg-white rounded-lg gap-9 shadow-3xl'>
      <p className='text-xl font-medium'>{title}</p>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-lg'>5000</p>
        <div className='text-5xl'>{icon}</div>
      </div>
    </div>
  );
};
const Farmers = () => {
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
        />
        <FarmerOverviewStats
          title='Female Farmers'
          icon={<BiFemale className='text-[#85B6FF]' />}
        />
        <FarmerOverviewStats
          title='Male Farmers'
          icon={<BiMale className='text-[#FFD233]' />}
        />
        <FarmerOverviewStats
          title='Total Farmers'
          icon={<GiFarmTractor className='text-[#4ECB71]' />}
        />
      </div>
      <div className='grid grid-cols-4 gap-8 mt-5 font-sans'>
        <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl'>
          <NoSSRTabale
            title='All Farmers'
            searchParameter='name'
            columns={farmerTableColumns}
            data={[
              {
                id: 1,
                name: 'Atalanta Redferne',
                region: '89978 Bellgrove Drive',
                category: 'Saxifragaceae',
                contact: '427-261-1584',
              },
              {
                id: 2,
                name: 'Amandy Philippart',
                region: '975 Tennessee Parkway',
                category: 'Asteraceae',
                contact: '747-864-6051',
              },
              {
                id: 3,
                name: 'Ilise MacKeeg',
                region: '2766 Southridge Lane',
                category: 'Monotropaceae',
                contact: '723-152-2428',
              },
              {
                id: 4,
                name: 'Lock Dowyer',
                region: '9 Ilene Circle',
                category: 'Convolvulaceae',
                contact: '116-753-4323',
              },
              {
                id: 5,
                name: 'Karolina Brimming',
                region: '345 Eggendart Hill',
                category: 'Malpighiaceae',
                contact: '379-213-1055',
              },
              {
                id: 6,
                name: 'Gayle Lankford',
                region: '05619 Union Parkway',
                category: 'Geraniaceae',
                contact: '438-213-7883',
              },
              {
                id: 7,
                name: 'Livvy Glyssanne',
                region: '096 Tennyson Park',
                category: 'Poaceae',
                contact: '417-310-2197',
              },
              {
                id: 8,
                name: 'Francis Jiricka',
                region: '47736 Springview Pass',
                category: 'Poaceae',
                contact: '735-295-1626',
              },
              {
                id: 9,
                name: 'Filippo Soaper',
                region: '43462 Daystar Circle',
                category: 'Olacaceae',
                contact: '510-523-5427',
              },
              {
                id: 10,
                name: 'Eada Willatts',
                region: '39 Amoth Avenue',
                category: 'Poaceae',
                contact: '708-497-9821',
              },
            ]}
          />
        </div>
        <div className='lg:flex hidden flex-col items-center px-8 overflow-y-auto bg-white max-h-[60rem] rounded-lg shadow-3xl'>
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
