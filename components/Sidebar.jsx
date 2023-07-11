import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiHome5Line } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';

const MenuItem = ({ path, isActive, icon, title }) => {
  return (
    <Link href={path}>
      <div
        className={`flex flex-row items-center  py-6 justify-center cursor-pointer ${
          isActive ? 'bg-[#EDF3FF] text-[#055189]' : 'text-white'
        }`}
      >
        <div className='flex flex-row items-center justify-start gap-4  xl:w-[9.33rem]'>
          <div className='text-3xl'>{icon}</div>
          <p className='xl:text-[1.030rem]  2xl:text-[1.174rem]  font-medium '>
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
    <div className='hidden h-full  xl:w-72 2xl:w-80 3xl:w-96 bg-[#073150] lg:flex justify-center py-5'>
      <aside className='flex flex-col items-center w-full '>
        <img src='/images/logo.png' className='w-36' />
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
            path='/settings'
            isActive={router.pathname.includes('/settings')}
            icon={<FiSettings />}
            title='Settings'
          />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
