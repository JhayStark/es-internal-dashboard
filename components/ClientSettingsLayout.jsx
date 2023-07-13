import { RxAvatar } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { RiKey2Line } from 'react-icons/ri';
import {
  MdOutlineNotificationsNone,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ClientSettingsLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className='grid grid-cols-6 gap-4 font-sans 3xl:grid-cols-4'>
        <div className='py-4 shadow-3xl pb-28 2xl:max-h-[36rem] col-span-2 3xl:col-span-1 bg-white'>
          <div className='flex flex-col items-center justify-center pb-6 pt-7 border-b-[1px]'>
            <RxAvatar className='text-9xl ' />
            <p className='pt-5 pb-1 text-lg font-semibold'>Esoko</p>
            <p className='text-[#747474]'>Potato Avenue, East-Legon, Accra</p>
          </div>
          <div className='flex flex-col items-center gap-10 pt-11'>
            <Link href='/clients/settings'>
              <div
                className={`flex flex-row items-center gap-3 w-44  cursor-pointer ${
                  router.pathname === '/clients/settings'
                    ? 'text-[#055189]'
                    : 'text-[#747474]'
                }`}
              >
                <AiOutlineUser className='text-lg' />
                <p>Edit Profile</p>
              </div>
            </Link>
            <Link href='/clients/settings/password'>
              <div
                className={`flex flex-row items-center gap-3 w-44  cursor-pointer ${
                  router.pathname === '/clients/settings/password'
                    ? 'text-[#055189]'
                    : 'text-[#747474]'
                }`}
              >
                <RiKey2Line className='text-lg' />
                <p>Reset Password</p>
              </div>
            </Link>
            <Link href='/clients/settings/services'>
              <div
                className={`flex flex-row items-center gap-3 w-44  cursor-pointer ${
                  router.pathname === '/clients/settings/services'
                    ? 'text-[#055189]'
                    : 'text-[#747474]'
                }`}
              >
                <MdOutlineNotificationsNone className='text-lg' />
                <p>Enabled Services</p>
              </div>
            </Link>
            <Link href='/clients/settings/admins'>
              <div
                className={`flex flex-row items-center gap-3 w-44  cursor-pointer ${
                  router.pathname === '/clients/settings/admins'
                    ? 'text-[#055189]'
                    : 'text-[#747474]'
                }`}
              >
                <MdOutlineAdminPanelSettings className='text-lg' />
                <p>Collaborators</p>
              </div>
            </Link>
          </div>
        </div>
        <div className='col-span-4 p-4 bg-white 3xl:col-span-3 shadow-3xl  2xl:h-[45rem] 3xl:h-[55rem] font-sans'>
          {children}
        </div>
      </div>
    </>
  );
};

export default ClientSettingsLayout;
