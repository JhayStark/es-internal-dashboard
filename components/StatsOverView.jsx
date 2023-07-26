import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StatsOverview = ({ title, icon, value }) => {
  return (
    <div className='flex flex-col gap-8 p-4 bg-white rounded-lg 3xl:gap-10 shadow-3xl'>
      <div className='flex items-center justify-between'>
        <p className='xl:text-[1.174rem] 3xl:text-[1.493rem] font-medium'>
          {title}
        </p>
        <div className=' text-[#D27C2C] text-2xl 3xl:text-4xl'>{icon}</div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-light 2xl:text-sm '>Updated 30m ago</p>
        <p className='text-[#055189] xl:text-xl 3xl:text-2xl'>
          {value || <Skeleton count={1} width={'8rem'} borderRadius={10} />}
        </p>
      </div>
    </div>
  );
};

export default StatsOverview;
