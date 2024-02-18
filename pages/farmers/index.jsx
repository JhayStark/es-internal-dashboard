import React from 'react';
import BarGraph from '@/components/BarGraph';
import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import { regionBarGraph, ageGroupBarGraph } from '@/data/farmerData';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';

const FarmerOverviewStats = ({ title, icon, value, percentage }) => {
  return (
    <div className='flex flex-col gap-5 p-5 bg-white rounded-lg shadow-3xl'>
      <p className='text-lg font-medium'>
        {title}{' '}
        <span
          className={`${
            percentage === '43%' ? 'text-red-300' : 'text-green-300'
          }`}
        >
          {percentage}
        </span>
      </p>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-lg'>{value}</p>
        <div className='text-4xl 3xl:text-5xl'>{icon}</div>
      </div>
    </div>
  );
};

const FarmersData = () => {
  return (
    <div>
      <ReportsNavigationTab
        routes={[
          { route: '/farmers', title: 'Dashboard' },
          { route: '/farmers/farmer-data', title: 'Farmers' },
        ]}
      />
      <div className='hidden grid-cols-4 gap-4 font-sans 2xl:gap-8 lg:grid'>
        <FarmerOverviewStats
          title='All Countries'
          icon={<FaGlobeAfrica className='text-primary' />}
          value={20}
          percentage=''
        />
        <FarmerOverviewStats
          title='Female Farmers'
          icon={<BiFemale className='text-[#85B6FF]' />}
          value={'687,484'}
          percentage={'43%'}
        />
        <FarmerOverviewStats
          title='Male Farmers'
          icon={<BiMale className='text-[#FFD233]' />}
          value={'911,317'}
          percentage={'57%'}
        />
        <FarmerOverviewStats
          title='Total Farmers'
          icon={<GiFarmTractor className='text-[#4ECB71]' />}
          value='1,598,801'
          percentage=''
        />
      </div>
      <div className='w-full px-5 py-2 mt-5 bg-white rounded-lg shadow-3xl'>
        <p className='py-2 mb-2 text-lg font-medium '>
          Regional Distribution of Farmers
        </p>
        <div className='h-[500px]'>
          <BarGraph data={regionBarGraph} />
        </div>
      </div>
      <div className='w-full px-5 py-2 mt-5 bg-white rounded-lg shadow-3xl'>
        <p className='py-2 mb-2 text-lg font-medium '>
          Age Distribution of Farmers
        </p>
        <div className='h-[500px]'>
          <BarGraph data={ageGroupBarGraph} />
        </div>
      </div>
    </div>
  );
};

export default FarmersData;
