import ClientSettingsLayout from '@/components/ClientSettingsLayout';

const Password = () => {
  return (
    <ClientSettingsLayout>
      <div className='pb-5 border-b-[1px]'>
        <p className='px-5 text-lg font-medium'>Password Settings</p>
        <p className='px-5 text-[#747474] text-sm'>
          Change or reset account password
        </p>
      </div>
      <div className='flex flex-col items-center py-10 '>
        <div className='w-full md:w-[80%]'>
          <div className='flex flex-col items-center w-full gap-10'>
            <div className='flex flex-col w-full gap-2'>
              <p>Email:</p>
              <input
                type='email'
                className='border-[1px] py-3 px-5 rounded'
                placeholder='johndoe@gmail.com'
              />
            </div>
          </div>
          <div className='flex flex-row self-start gap-3 pt-8 2xl:pt-16'>
            <button className='py-2 px-5 bg-[#055189] font-semibold rounded text-white'>
              Request Change
            </button>
          </div>
        </div>
      </div>
    </ClientSettingsLayout>
  );
};

export default Password;
