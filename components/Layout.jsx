import BreadCrump from './BreadCrump';
import BreadCrumpMobileDevice from './BreadCrumpMobileDevice';
import Sidebar from './Sidebar';
import { useContext, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { AuthContext } from '@/context/AuthProvider';

const NavBar = ({ menuState, handleMenuToggle }) => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div
      onClick={() => {
        if (menuState) handleMenuToggle(false);
        return null;
      }}
      className='sticky top-0 flex flex-row justify-between py-4 bg-[#EDF3FF] z-50 '
    >
      <div className='hidden xl:block'>
        <BreadCrump />
      </div>
      <div className='block xl:hidden'>
        <BreadCrumpMobileDevice />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p>Hi {user && `${user['name']}`}</p>
        <div>
          <RxAvatar
            className='text-2xl cursor-pointer'
            onClick={() => handleMenuToggle(!menuState)}
          />
          {menuState && (
            <div className='absolute p-2 mt-1 font-medium text-red-500 bg-white rounded shadow-2xl cursor-pointer right-1 '>
              <p onClick={() => logoutUser()}>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className='flex flex-row w-full h-screen font-sans'>
      <Sidebar />
      <div className='w-full bg-[#EDF3FF] overflow-y-auto px-5 3xl:px-14 '>
        <NavBar menuState={openMenu} handleMenuToggle={setOpenMenu} />
        <div
          className='py-2  max-w-[2000px]'
          onClick={() => {
            if (openMenu) setOpenMenu(false);
            return null;
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
