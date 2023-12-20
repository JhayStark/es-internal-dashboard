import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiHome5Line } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineAgriculture } from 'react-icons/md';

const MenuItem = ({ path, isActive, icon, title }) => {
  return (
    <Link href={path}>
      <div
        className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
          isActive ? 'bg-[#EDF3FF] text-[#055189]' : 'text-white'
        }`}
      >
        <div className='flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]'>
          <div className='text-2xl 3xl:text-3xl'>{icon}</div>
          <p className='xl:text-base  3xl:text-[1.174rem]  font-medium '>
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className='justify-center hidden h-full py-5 xl:w-72 3xl:w-96 bg-primary xl:flex'>
      <aside className='flex flex-col items-center w-full '>
        <img src='/images/logo-1.png' className='w-40 3xl:w-60' />
        <div className='w-full mt-10'>
          <MenuItem
            path='/'
            isActive={router.pathname === '/'}
            icon={<RiHome5Line />}
            title='Dashboard'
          />
          <MenuItem
            path='/clients'
            isActive={router.pathname.includes('/clients')}
            icon={<FaRegUser />}
            title='Clients'
          />
          <MenuItem
            path='/reports'
            isActive={router.pathname.includes('/reports')}
            icon={<TbReportSearch />}
            title='Reports'
          />
          <MenuItem
            path='/agro-smart'
            isActive={router.pathname.includes('/agro-smart')}
            icon={<MdOutlineAgriculture />}
            title='AgroSmart'
          />
          <MenuItem
            path='/settings'
            isActive={
              router.pathname.includes('/settings') &&
              !router.pathname.includes('/clients')
            }
            icon={<FiSettings />}
            title='Settings'
          />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
