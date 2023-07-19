import BreadCrump from './BreadCrump';
import BreadCrumpMobileDevice from './BreadCrumpMobileDevice';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';

const NavBar = ({ menuState, handleMenuToggle }) => {
  return (
    <div className='sticky top-0 flex flex-row justify-between py-4 bg-[#EDF3FF] z-50 '>
      <div className='hidden xl:block'>
        <BreadCrump />
      </div>
      <div className='block xl:hidden'>
        <BreadCrumpMobileDevice />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p>Hi Joel</p>
        <div>
          <RxAvatar
            className='text-2xl cursor-pointer'
            onClick={() => handleMenuToggle(!menuState)}
          />
          {menuState && (
            <div className='absolute p-2 mt-1 font-medium text-red-500 bg-white rounded shadow-2xl cursor-pointer right-1 '>
              Log Out
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
      <div className='w-full bg-[#EDF3FF] overflow-y-auto px-3 lg:px-14 '>
        <NavBar menuState={openMenu} handleMenuToggle={setOpenMenu} />
        <div
          className='py-2 '
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
