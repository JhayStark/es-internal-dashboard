import Link from 'next/link';
import { useRouter } from 'next/router';

const AgroSmartNavigationTab = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center mb-5 font-sans'>
      <div className='flex flex-row items-center justify-center bg-white rounded-lg'>
        <Link href='/agro-smart'>
          <p
            className={`px-5 py-2  3xl:text-lg antialiased font-medium rounded-lg cursor-pointer ${
              router.pathname === '/agro-smart'
                ? 'bg-primary text-white'
                : 'bg-white'
            }`}
          >
            Market Price
          </p>
        </Link>
        <Link href='/agro-smart/climate-smart'>
          <p
            className={`px-5 py-2  3xl:text-lg antialiased font-medium rounded-lg cursor-pointer ${
              router.pathname === '/agro-smart/climate-smart'
                ? 'bg-primary text-white'
                : 'bg-white'
            }`}
          >
            Climate Smart
          </p>
        </Link>
        <Link href='/agro-smart/agro-advice'>
          <p
            className={`px-5 py-2  3xl:text-lg antialiased font-medium rounded-lg cursor-pointer ${
              router.pathname === '/agro-smart/agro-advice'
                ? 'bg-primary text-white'
                : 'bg-white'
            }`}
          >
            Agro-Advice
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AgroSmartNavigationTab;
