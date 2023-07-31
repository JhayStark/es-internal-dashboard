import Link from 'next/link';
import { RxAvatar } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { RiKey2Line } from 'react-icons/ri';
import {
  MdOutlineNotificationsNone,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { useClientProfile } from '../hooks/fetchers';

const MenuItem = ({ route, isActive, icon, title }) => {
  return (
    <Link href={route}>
      <div
        className={`flex flex-row items-center gap-3 w-44  cursor-pointer ${
          isActive ? 'text-[#055189]' : 'text-[#747474]'
        }`}
      >
        <div className='text-lg'>{icon}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

const ClientSettingsLayout = ({ children }) => {
  const router = useRouter();
  const { profile } = useClientProfile(router.query.id);

  return (
    <>
      <div className='grid grid-cols-6 gap-4 font-sans 3xl:grid-cols-4'>
        <div className='py-4 hidden rounded-lg lg:block shadow-3xl pb-28 2xl:max-h-[36rem] col-span-2 3xl:col-span-1 bg-white'>
          <div className='flex flex-col items-center justify-center pb-6 pt-7 border-b-[1px]'>
            <RxAvatar className='text-9xl ' />
            <p className='pt-5 pb-1 text-lg font-semibold'>
              {profile?.client.clientName}
            </p>
            <p className='text-[#747474]'>{profile?.client.address}</p>
          </div>
          <div className='flex flex-col items-center gap-10 pt-11'>
            <MenuItem
              icon={<AiOutlineUser />}
              route={`/clients/${router.query.id}/settings`}
              isActive={router.pathname === `/clients/[id]/settings`}
              title='Edit Profile'
            />
            <MenuItem
              icon={<RiKey2Line />}
              route={`/clients/${router.query.id}/settings/password`}
              isActive={router.pathname === `/clients/[id]/settings/password`}
              title='Reset Password'
            />
            <MenuItem
              icon={<MdOutlineNotificationsNone />}
              route={`/clients/${router.query.id}/settings/services`}
              isActive={router.pathname === `/clients/[id]/settings/services`}
              title='Enabled Services'
            />
            <MenuItem
              icon={<MdOutlineAdminPanelSettings />}
              route={`/clients/${router.query.id}/settings/admins`}
              isActive={router.pathname === `/clients/[id]/settings/admins`}
              title='Collaborators'
            />
          </div>
        </div>
        <div className='lg:col-span-4 rounded-lg  col-span-6 p-4 bg-white 3xl:col-span-3 shadow-3xl  2xl:h-[45rem] 3xl:h-[55rem] font-sans'>
          {children}
        </div>
      </div>
    </>
  );
};

export default ClientSettingsLayout;
