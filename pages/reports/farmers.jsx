import ReportsNavigationTab from '@/components/ReportsNavigationTab';
import dynamic from 'next/dynamic';
import api from '@/utils/axiosInstance';
import { useState } from 'react';
import { BiMale, BiFemale } from 'react-icons/bi';
import { GiFarmTractor } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useTableData, useRegionalDistribution } from '@/hooks/fetchers';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
  } = useTableData(
    'https://internal-manager-api.onrender.com/api/reports/farmers',
    true
  );

  const { regionalDistribution } = useRegionalDistribution();
  const farmerTableColumns = [
    {
      name: 'Name',
      selector: row => row.name,

      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Network',
      selector: row => row.category,
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

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
    if (selectedFile) handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    await api
      .post('/reports/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => alert('Uploaded'))
      .catch(() => alert('Failed to update'));
  };
  return (
    <div>
      <ReportsNavigationTab />
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center mb-2 '>
          <p className='text-lg font-medium 3xl:text-xl'>Select Country:</p>
          <select
            name=''
            id=''
            className='px-1  3xl:text-lg ml-2 rounded-xl bg-[#e3c24a] focus:outline-none'
          >
            <option value='gh'>Ghana</option>
          </select>
        </div>
        <div className='flex flex-row items-center'>
          <label
            htmlFor='fileUpload'
            className='flex flex-row items-center gap-2 text-lg cursor-pointer hover:scale-105'
          >
            <AiOutlineCloudUpload />
            <p className='hidden md:block'>Upload Farmers</p>
          </label>
          <input
            type='file'
            id='fileUpload'
            name='fileUpload'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className='hidden grid-cols-4 gap-4 font-sans 2xl:gap-8 lg:grid'>
        <FarmerOverviewStats
          title='All Countries'
          icon={<FaGlobeAfrica className='text-[#073150]' />}
          value={tableData?.countriesCovered}
        />
        <FarmerOverviewStats
          title='Female Farmers'
          icon={<BiFemale className='text-[#85B6FF]' />}
          value={tableData?.totalFemaleFarmers}
        />
        <FarmerOverviewStats
          title='Male Farmers'
          icon={<BiMale className='text-[#FFD233]' />}
          value={tableData?.totalMaleFarmers}
        />
        <FarmerOverviewStats
          title='Total Farmers'
          icon={<GiFarmTractor className='text-[#4ECB71]' />}
          value={tableData?.totalFemaleFarmers + tableData?.totalMaleFarmers}
        />
      </div>
      <div className='grid grid-cols-4 gap-4 mt-5 font-sans 2xl:gap-8 '>
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
    </div>
  );
};

export default Farmers;
