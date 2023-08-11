import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ClientSettingsMobileNav = () => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('');

  const handleSelectChange = e => {
    setSelectedPage(e.target.value);
    router.push(`${e.target.value}`);
  };

  useEffect(() => {
    const urlToFilter = router.pathname.split('/');
    urlToFilter[2] = router.query.id;
    const filteredUrl = urlToFilter.join('/');
    setSelectedPage(filteredUrl);
  }, [router]);
  return (
    <>
      <div className='flex flex-col items-center justify-center mb-3 font-sans'>
        <div className='flex flex-row items-center justify-center p-2 bg-white rounded-lg focus:outline-none'>
          <select
            className='flex flex-row items-center justify-center bg-inherit focus:outline-none'
            value={selectedPage}
            onChange={handleSelectChange}
          >
            <option value={`/clients/${router.query.id}/settings`}>
              Edit Profile
            </option>
            <option value={`/clients/${router.query.id}/settings/password`}>
              Reset Passowrd
            </option>
            <option value={`/clients/${router.query.id}/settings/services`} i>
              Enabled Services
            </option>
            <option value={`/clients/${router.query.id}/settings/admins`}>
              Collaborators
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ClientSettingsMobileNav;
