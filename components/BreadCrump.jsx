import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

const BreadCrumb = () => {
  const router = useRouter();
  const { pathname } = router;

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    let breadcrumbItems = [];
    let path = '';

    for (let i = 0; i < pathSegments.length; i++) {
      let pathValue = pathSegments[i];
      if (pathValue.includes('id')) pathValue = router.query.id;
      path += '/' + pathValue;
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
                {pathValue}
              </Link>
            ) : (
              <span className='ml-1 text-sm font-medium text-gray-500 md:ml-2'>
                {pathValue}
              </span>
            )}
          </div>
        </li>
      );
    }

    return breadcrumbItems;
  };

  return (
    <nav className='flex items-center ' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li key='dashboard' className='flex items-center'>
          <Link
            href='/'
            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'
          >
            <AiFillHome className='mr-2 ' />
            <p> Dashboards</p>
          </Link>
        </li>
        {getBreadcrumbItems()}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
