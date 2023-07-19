import ClientSettingsLayout from '@/components/ClientSettingsLayout';
import React from 'react';

const Index = () => {
  return (
    <ClientSettingsLayout>
      <div className='pb-5 border-b-[1px]'>
        <p className='px-5 text-lg font-medium'>Edit Profile</p>
        <p className='px-5 text-[#747474] text-sm'>
          Set Up Your Personal Information
        </p>
      </div>
      <div className='flex flex-col items-center py-10 '>
        <div className='w-[80%]'>
          <div className='flex flex-col items-center w-full gap-10'>
            <div className='flex flex-col w-full gap-2'>
              <p>Business Name:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='Doe Ltd'
              />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <p>Phone Number:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='0247546545'
              />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <p>Email:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='doeltd@gmail.com'
              />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <p>Address:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='Potato lane, Accra'
              />
            </div>
          </div>
          <div className='flex flex-row self-start gap-3 pt-20 2xl:pt-28'>
            <button className='py-2 px-5 bg-[#055189] font-semibold rounded text-white'>
              Request Update
            </button>
            <button className='p-2 bg-[#F8F9FB] text-[#404040] font-semibold rounded'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ClientSettingsLayout>
  );
};

export default Index;
