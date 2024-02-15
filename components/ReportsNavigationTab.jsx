import Link from 'next/link';
import { useRouter } from 'next/router';

const Links = ({ route, isActive, title }) => (
  <Link href={route}>
    <p
      className={`px-5 py-2  3xl:text-xl font-medium rounded-lg cursor-pointer ${
        isActive ? 'bg-primary text-white' : 'bg-white'
      }`}
    >
      {title}
    </p>
  </Link>
);

const ReportsNavigationTab = ({ routes }) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center mb-5 font-sans'>
      <div className='flex flex-row items-center justify-center bg-white rounded-lg'>
        {/* <Link href='/reports'>
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
        </Link> */}
        {routes.map(route => (
          <Links
            key={route.route}
            route={route.route}
            title={route.title}
            isActive={router.pathname === route.route}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportsNavigationTab;
