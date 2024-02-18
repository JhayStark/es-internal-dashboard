import BreadCrump from './BreadCrump';
import BreadCrumpMobileDevice from './BreadCrumpMobileDevice';
import Sidebar from './Sidebar';
import { useContext, useEffect, useRef, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { AuthContext } from '@/context/AuthProvider';

const NavBar = ({ menuState, handleMenuToggle, menuRef }) => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className='sticky top-0 flex flex-row justify-between py-4 bg-[#EDF3FF] z-50 '>
      <div className='hidden xl:block'>
        <BreadCrump />
      </div>
      <div className='block xl:hidden'>
        <BreadCrumpMobileDevice />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <p>Hi {user && `${user['name']}`}</p>
        <div ref={menuRef}>
          <RxAvatar
            className='text-2xl cursor-pointer'
            onClick={() => handleMenuToggle(!menuState)}
          />
          {menuState && (
            <div className='absolute p-2 mt-1 font-medium text-red-500 bg-white rounded shadow-2xl cursor-pointer right-1 '>
              <button onClick={() => logoutUser()}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);
  return (
    <div className='flex flex-row w-full h-screen font-sans'>
      <Sidebar />
      <div className='w-full flex flex-col bg-[#EDF3FF] overflow-y-auto px-5 3xl:px-14 '>
        <NavBar
          menuState={openMenu}
          handleMenuToggle={setOpenMenu}
          menuRef={menuRef}
        />
        <div className='pt-2 pb-10  max-w-[1600px]  flex-grow '>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
