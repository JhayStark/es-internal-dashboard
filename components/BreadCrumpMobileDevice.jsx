import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BreadCrumbMobileDevices = () => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('');

  const handleSelectChange = e => {
    setSelectedPage(e.target.value);
    router.push(`${e.target.value}`);
  };

  useEffect(() => {
    if (router.pathname !== '/') {
      const filteredPathname = router.pathname.split('/')[1];
      setSelectedPage(`/${filteredPathname}`);
      return;
    }
    setSelectedPage(router.pathname);
  }, []);

  //   let breadcrumbItems = [];
  //   let path = '';

  //   for (let i = 1; i < pathSegments.length; i++) {
  //     let pathValue = pathSegments[i];
  //     if (pathValue.includes('id')) pathValue = router.query.id;
  //     path += '/' + pathValue;
  //     const isLastSegment = i === pathSegments.length - 1;

  //     breadcrumbItems.push(
  //       <li key={path} className='flex items-center'>
  //         <div className='flex items-center'>
  //           <IoIosArrowForward className='mr-2 text-gray-500' />
  //           {!isLastSegment ? (
  //             <Link
  //               href={path}
  //               className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'
  //             >
  //               {pathValue}
  //             </Link>
  //           ) : (
  //             <span className='ml-1 text-sm font-medium text-gray-500 md:ml-2'>
  //               {pathValue}
  //             </span>
  //           )}
  //         </div>
  //       </li>
  //     );
  //   }

  //   return breadcrumbItems;
  // };

  return (
    <ol className='inline-flex items-center space-x-1 font-sans md:space-x-3'>
      <li key='dashboard' className='flex items-center'>
        <select
          name=''
          id=''
          className='py-2 pr-2 text-gray-700 focus:outline-none bg-inherit '
          onChange={handleSelectChange}
          value={selectedPage}
        >
          <option value='/'>Dashboard</option>
          <option value='/clients'>Client</option>
          <option value='/reports'>Reports</option>
          <option value='/settings'>Settings</option>
        </select>
      </li>
    </ol>
  );
};

export default BreadCrumbMobileDevices;
