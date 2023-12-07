import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ link, router, name }) => {
  return (
    <Link href={link}>
      <p
        className={`px-5 py-2 text-sm  md:text-lg antialiased font-medium rounded-lg cursor-pointer ${
          router.pathname === link ? 'bg-primary text-white' : 'bg-white'
        }`}
      >
        {name}
      </p>
    </Link>
  );
};

const navItems = [
  {
    link: '/agro-smart',
    name: 'Market Price',
  },
  {
    link: '/agro-smart/climate-smart',
    name: 'Climate Smart',
  },
  { link: '/agro-smart/agro-advice', name: 'Agro-Advice' },
];

const AgroSmartNavigationTab = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center mb-5 font-sans'>
      <div className='flex flex-row items-center justify-center bg-white rounded-lg'>
        {navItems.map(item => (
          <NavItem
            key={item.name}
            link={item.link}
            router={router}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default AgroSmartNavigationTab;
