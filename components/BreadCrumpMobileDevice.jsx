import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowForward } from 'react-icons/io';

const BreadCrumbMobileDevices = () => {
  const router = useRouter();
  const { pathname } = router;

  const handleSelectChange = e => router.push(`/${e.target.value}`);

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    let breadcrumbItems = [];
    let path = '';

    for (let i = 1; i < pathSegments.length; i++) {
      path += '/' + pathSegments[i];
      const isLastSegment = i === pathSegments.length - 1;

      breadcrumbItems.push(
        <li key={path} className='flex items-center'>
          <div className='flex items-center'>
            <IoIosArrowForward className='mr-2 text-gray-500' />
            {!isLastSegment ? (
              <Link
                href={path}
                className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'
              >
                {pathSegments[i]}
              </Link>
            ) : (
              <span className='ml-1 text-sm font-medium text-gray-500 md:ml-2'>
                {pathSegments[i]}
              </span>
            )}
          </div>
        </li>
      );
    }

    return breadcrumbItems;
  };

  return (
    <nav className='flex items-center font-sans ' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li key='dashboard' className='flex items-center'>
          <select
            name=''
            id=''
            className='py-2 pr-2 text-gray-700 focus:outline-none bg-inherit '
            onChange={handleSelectChange}
          >
            <option value='/'>Dashboard</option>
            <option value='clients'>Client</option>
            <option value='reports'>Reports</option>
            <option value='settings'>Settings</option>
          </select>
        </li>
        {getBreadcrumbItems()}
      </ol>
    </nav>
  );
};

export default BreadCrumbMobileDevices;