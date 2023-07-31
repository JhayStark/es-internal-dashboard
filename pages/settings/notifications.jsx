import SettingsLayout from '@/components/SettingsLayout';
import { useState } from 'react';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button
      className={`w-12 h-6 flex items-center rounded-full p-1 ${
        isToggled ? 'bg-[#055189]' : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isToggled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const Notifications = () => {
  return (
    <SettingsLayout>
      <div className='pb-5 border-b-[1px]'>
        <p className='px-5 text-lg font-medium'>Notifications</p>
        <p className='px-5 text-[#747474] text-sm'>
          Choose what notifications you will receive
        </p>
      </div>
      <div className='mx-6 mt-12 p-7 border-[1px] bg-[#EDF3FF] rounded-md'>
        <div className='flex flex-row items-center justify-between mb-5'>
          <p>Notifications</p>
          <p>Toggle All</p>
        </div>
        <div className='my-5 bg-white rounded-md'>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Company News</p>
              <p className='text-[#747474]'>
                Get Company News and announcements
              </p>
            </div>
            <ToggleButton />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Peer News</p>
              <p className='text-[#747474]'>
                Get Company News and announcements
              </p>
            </div>
            <ToggleButton />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Company News</p>
              <p className='text-[#747474]'>
                Get Company News and announcements
              </p>
            </div>
            <ToggleButton />
          </div>
          <div className='flex flex-row items-center justify-between border-b-[1px] px-6 py-5'>
            <div>
              <p className='font-semibold text-[#404040]'>Company News</p>
              <p className='text-[#747474]'>
                Get Company News and announcements
              </p>
            </div>
            <ToggleButton />
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Notifications;
