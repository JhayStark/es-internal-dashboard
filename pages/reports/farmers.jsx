import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import dynamic from 'next/dynamic';
import api from '@/utils/axiosInstance';
import { useState } from 'react';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';
import UploadModal from '@/components/UploadModal';
import {
  useTableData,
  useRegionalDistribution,
  useCountries,
} from '@/hooks/fetchers';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const FarmerOverviewStats = ({ title, icon, value }) => {
  return (
    <div className='flex flex-col gap-5 p-5 bg-white rounded-lg shadow-3xl'>
      <p className='text-xl font-medium'>{title}</p>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-lg'>{value}</p>
        <div className='text-4xl 3xl:text-5xl'>{icon}</div>
      </div>
    </div>
  );
};
const Farmers = () => {
  const [selectedCountry, setSelectedCountry] = useState('Portugal');
  const [uploadModalState, setUploadModalState] = useState(false);
  const {
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
    handlePageChange,
  } = useTableData(`/reports/farmers?country=${selectedCountry}`, true);
  const { regionalDistribution } = useRegionalDistribution(
    `/reports/regional-distributions?country=${selectedCountry}`
  );
  const { countries } = useCountries();

  const farmerTableColumns = [
    {
      name: 'Name',
      selector: row => row.name,

      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.district,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Network',
      selector: row => row.network,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
    },
  ];

  return (
    <div>
      <ReportsNavigationTab />
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center mb-1 md:mb-2 '>
          <p className='text-lg font-medium 3xl:text-xl'>Select Country:</p>
          <select
            name=''
            id=''
            className='px-1  3xl:text-lg ml-2 rounded-xl bg-inherit text-[#ffd643] focus:outline-none'
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
          >
            {countries?.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='hidden grid-cols-4 gap-4 font-sans 2xl:gap-8 lg:grid'>
        <FarmerOverviewStats
          title='All Countries'
          icon={<FaGlobeAfrica className='text-[#073150]' />}
          value={tableData?.countriesCovered || 0}
        />
        <FarmerOverviewStats
          title='Female Farmers'
          icon={<BiFemale className='text-[#85B6FF]' />}
          value={tableData?.totalFemaleFarmers || 0}
        />
        <FarmerOverviewStats
          title='Male Farmers'
          icon={<BiMale className='text-[#FFD233]' />}
          value={tableData?.totalMaleFarmers || 0}
        />
        <FarmerOverviewStats
          title='Total Farmers'
          icon={<GiFarmTractor className='text-[#4ECB71]' />}
          value={
            tableData?.totalFemaleFarmers + tableData?.totalMaleFarmers || 0
          }
        />
      </div>
      <div className='grid grid-cols-4 gap-4 font-sans md:mt-5 2xl:gap-8 '>
        <div className='col-span-4 px-5 py-2 bg-white rounded-lg lg:col-span-3 shadow-3xl '>
          <NoSSRTable
            data={tableData?.paginatedData}
            columns={farmerTableColumns}
            title='Farmer Profiles'
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
            handlePageChange={handlePageChange}
            farmerTable
            setUploadModalState={setUploadModalState}
          />
        </div>
        <div className='flex-col items-center hidden px-3 3xl:px-8 overflow-y-auto bg-white rounded-lg lg:flex shadow-3xl max-h-[46rem] '>
          <p className='sticky top-0 py-3 font-medium text-center bg-white 3xl:text-lg '>
            Regional Distribution of Farmers
          </p>
          <div className='flex flex-col '>
            {regionalDistribution?.map((region, index) => (
              <div className='grid items-center w-full grid-cols-2 space-y-3'>
                <p
                  className={`3xl:text-lg text-left ${
                    index % 2 === 0 ? 'text-[#073150]' : 'text-[#85B6FF]'
                  }`}
                >
                  {region.region}
                </p>
                <p className='text-lg font-medium text-right 3xl:text-xl'>
                  {region.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UploadModal
        modalState={uploadModalState}
        close={() => setUploadModalState(false)}
      />
    </div>
  );
};

export default Farmers;
