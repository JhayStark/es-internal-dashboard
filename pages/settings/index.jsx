import SettingsLayout from '@/components/SettingsLayout';

const Index = () => {
  return (
    <SettingsLayout>
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
              <p>Name:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='John Doe'
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
              <p>Department:</p>
              <input
                type='text'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='Accounting Department'
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
    </SettingsLayout>
  );
};

export default Index;
