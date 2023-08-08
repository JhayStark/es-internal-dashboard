import ClientSettingsLayout from '@/components/ClientSettingsLayout';
import { useClientProfile } from '@/hooks/fetchers';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ToggleButton = ({ serviceState }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(serviceState => !serviceState);
  };

  return (
    <button
      className={`w-12 h-6 flex items-center rounded-full p-1 ${
        serviceState ? 'bg-[#055189]' : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          serviceState ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const Notifications = () => {
  const router = useRouter();
  const { profile } = useClientProfile(router.query.id);

  return (
    <ClientSettingsLayout>
      <div className='pb-5 border-b-[1px]'>
        <p className='px-5 text-lg font-medium'>Services</p>
        <p className='px-5 text-[#747474] text-sm'>
          Add or remove services from account
        </p>
      </div>
      <div className='mx-6 mt-12 p-7 border-[1px] bg-[#EDF3FF] rounded-md'>
        <div className='flex flex-row items-center justify-between mb-5'>
          <p>Services</p>
          <p>Toggle All</p>
        </div>
        <div className='my-5 bg-white rounded-md'>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Push</p>
              <p className='text-[#747474]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <ToggleButton serviceState={profile?.servicesUsed.push} />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Insyt</p>
              <p className='text-[#747474]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <ToggleButton serviceState={profile?.servicesUsed['Insyt']} />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Voice</p>
              <p className='text-[#747474]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <ToggleButton serviceState={profile?.servicesUsed['Voice']} />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Sms</p>
              <p className='text-[#747474]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <ToggleButton serviceState={profile?.servicesUsed['Sms']} />
          </div>
        </div>
      </div>
    </ClientSettingsLayout>
  );
};

export default Notifications;
