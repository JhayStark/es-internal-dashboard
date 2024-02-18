import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import dynamic from 'next/dynamic';
import FarmerTableFilterModal from '@/components/FarmerTableFilterModal';
import { useEffect, useState } from 'react';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';
import UploadModal from '@/components/UploadModal';
import {
  useTableData,
  useRegionalDistribution,
  useCountries,
  useRegionalStatsData,
} from '@/hooks/fetchers';
import MapChart from '@/components/MapChart';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const FarmerOverviewStats = ({ title, icon, value }) => {
  return (
    <div className='flex flex-col gap-5 p-5 bg-white rounded-lg shadow-3xl'>
      <p className='text-lg font-medium'>{title}</p>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-lg'>{value}</p>
        <div className='text-4xl 3xl:text-5xl'>{icon}</div>
      </div>
    </div>
  );
};
const Farmers = () => {
  const [selectedCountry, setSelectedCountry] = useState('Ghana');
  const [uploadModalState, setUploadModalState] = useState(false);
  const [farmerFilterModalState, setFarmerFilterModalState] = useState(false);
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
  const { regionalStats, regionalStatsIsLoading } = useRegionalStatsData();
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
      selector: row => row.crops,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
    },
  ];

  const closeFarmerFilterModal = () => {
    setFarmerFilterModalState(false);
  };
  useEffect(() => {
    if (countries) setSelectedCountry(countries[0]);
  }, [countries]);

  return (
    <div>
      <ReportsNavigationTab
        routes={[
          { route: '/farmers', title: 'Farmers' },
          { route: '/farmers/review', title: 'New Farmers' },
        ]}
      />
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
          icon={<FaGlobeAfrica className='text-primary' />}
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
            data={tableData?.farmersReportsData}
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
            setFarmerFilterModalState={setFarmerFilterModalState}
          />
        </div>
        <div className='flex-col items-center hidden px-3 3xl:px-8 overflow-y-auto bg-white rounded-lg lg:flex shadow-3xl max-h-[46rem] '>
          <p className='sticky top-0 py-3 text-lg font-medium text-center bg-white 3xl:text-lg '>
            Regional Distribution
          </p>
          <div className='flex flex-col w-full gap-5 pt-5'>
            {regionalDistribution?.map((region, index) => (
              <div className='grid w-full grid-cols-4 ' key={region.region}>
                <p
                  className={` text-left col-span-3 ${
                    index % 2 === 0 ? 'text-primary' : 'text-[#85B6FF]'
                  }`}
                >
                  {region.region.toUpperCase()}
                </p>
                <p className='text-lg font-medium text-right '>
                  {region.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full px-5 py-2 mt-5 bg-white rounded-lg shadow-3xl'>
        <p className='py-2 mb-2 text-lg font-medium '>
          Regional Distribution of Farmers
        </p>
        <MapChart
          center={{ lat: 7.9527706, lng: -1.0307118 }}
          markers={regionalStats?.data}
          isLoading={regionalStatsIsLoading}
        />
      </div>

      <UploadModal
        modalState={uploadModalState}
        close={() => setUploadModalState(false)}
      />
      <FarmerTableFilterModal
        modalState={farmerFilterModalState}
        closeModal={closeFarmerFilterModal}
      />
    </div>
  );
};

export default Farmers;
