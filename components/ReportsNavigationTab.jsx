import Link from 'next/link';
import { useRouter } from 'next/router';

const ReportsNavigationTab = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center mb-5 font-sans'>
      <div className='flex flex-row items-center justify-center bg-white rounded-lg'>
        <Link href='/reports'>
          <p
            className={`px-5 py-2  3xl:text-xl font-medium rounded-lg cursor-pointer ${
              router.pathname === '/reports'
                ? 'bg-primary text-white'
                : 'bg-white'
            }`}
          >
            Services
          </p>
        </Link>
        <Link href='/reports/farmers'>
          <p
            className={`px-5 py-2  3xl:text-xl font-medium rounded-lg cursor-pointer ${
              router.pathname === '/reports/farmers'
                ? 'bg-primary text-white'
                : 'bg-white'
            }`}
          >
            Farmers
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ReportsNavigationTab;
