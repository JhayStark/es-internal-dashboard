import { useState } from 'react';
import { LuMoreVertical } from 'react-icons/lu';
import { AiOutlineSearch, AiOutlineDownload } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { clientInsytData } from '../../dummyData';
import Modal from '@/components/Modal';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const UserDetails = () => {
  const [tab, setTab] = useState('insyt');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const columns = [
    {
      name: 'Date Created',
      selector: 'dateCreated',
      sortable: true,
    },
    {
      name: 'Form Name',
      selector: 'campaignName',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: row => (
        <p
          className={`${
            row.status
              ? 'text-green-500 bg-green-200 '
              : 'text-red-500 bg-red-200'
          } rounded-md px-2 text-sm`}
        >
          {row.status ? 'Active' : 'Inactive'}
        </p>
      ),
      center: true,
    },
    {
      name: 'Responses',
      selector: 'responses',
      center: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <LuMoreVertical className='text-2xl' />
        </div>
      ),
      center: true,
    },
  ];
  return (
    <>
      <div className='grid grid-cols-9  3xl:grid-cols-11 gap-[1.4rem] font-sans '>
        <div className='col-span-9 lg:col-span-5 3xl:col-span-7'>
          <div className='flex flex-col justify-between h-full '>
            <div className='p-5 bg-white rounded-lg shadow-3xl min-h-[75%] flex flex-row justify-between  '>
              <div className='flex flex-col items-start justify-between h-full'>
                <div className='flex flex-col justify-start'>
                  <div className='flex flex-row items-center gap-2'>
                    <div className='bg-[#D27C2C] px-2  rounded-lg'>
                      <p className='text-lg font-semibold text-white'>E</p>
                    </div>
                    <p className='text-3xl font-semibold text-[#2A3547]'>
                      ESOKO
                    </p>
                  </div>
                  <p className='text-[#828282] text-sm mt-3'>
                    Joined on 26th July 2021
                  </p>
                </div>
                <div className='flex flex-col justify-end'>
                  <p className='font-medium  text-[#2A3547] '>
                    Pawpaw Street, East legon Ghana
                  </p>
                  <p className='font-medium text-sm text-[#2A3547] '>
                    0201234567 / 0307894561
                  </p>
                  <p className='font-medium text-sm text-[#2A3547] '>
                    esoko@gmail.com
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-end justify-between '>
                <Link href='/clients/settings'>
                  <FiSettings className='text-xl text-[#2A3547] cursor-pointer hover:scale-125' />
                </Link>
                <div className='flex items-center gap-4 lg:hidden'>
                  <p className='hidden text-lg sm:block'>Balance ₵ 500.00 </p>
                  <button
                    className='bg-[#F24E1E] hidden sm:block text-sm font-medium shadow-md hover:scale-110 text-white rounded-lg p-1'
                    onClick={openModal}
                  >
                    Top-up
                  </button>
                  <button
                    className='bg-[#F24E1E] text-2xl sm:hidden cursor-pointer  font-medium shadow-md hover:scale-110 text-white rounded-lg py-1 px-3'
                    onClick={openModal}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-white mt-8 lg:mt-0 grid text-lg sm:text-2xl grid-cols-2 rounded-lg shadow-3xl sm:w-[50%]'>
              <p
                className={`text-center  font-medium rounded-lg py-2 cursor-pointer ${
                  tab === 'insyt' && 'bg-[#3D7DAD] text-white'
                }`}
                onClick={() => setTab('insyt')}
              >
                Insyt
              </p>

              <p
                className={`text-center  font-medium rounded-lg py-2 cursor-pointer ${
                  tab === 'push' && 'bg-[#F24E1E] text-white'
                }`}
                onClick={() => setTab('push')}
              >
                Push
              </p>
            </div>
          </div>
        </div>
        <div className=' hidden lg:block col-span-2 3xl:mx-3 px-4 py-5 bg-white rounded-lg shadow-3xl max-h-[18rem] 2xl:max-h-[20rem]'>
          <p className='text-3xl font-semibold text-[#1252A6] mb-6'>insyt</p>
          <p className='text-center 2xl:py-10 py-8 text-[2.5rem] font-semibold'>
            985
          </p>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#BC7674]'></div>
              <p className='text-lg font-semibold'>920</p>
              <p className='text-sm text-[#1E1E1E]'>InActive</p>
            </div>
            <div className='flex flex-col gap-1 '>
              <div className='w-5 h-2 rounded-xl bg-[#00DBDB]'></div>
              <p className='text-lg font-semibold'>920</p>
              <p className='text-sm text-[#1E1E1E]'>Active</p>
            </div>
          </div>
        </div>
        <div className='hidden lg:block col-span-2 px-4 py-5 3xl:mx-3 bg-white rounded-lg shadow-3xl max-h-[20rem]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <p className='text-3xl font-semibold text-[#F24E1E]'>Push</p>
            <button
              className='bg-[#F24E1E] text-sm font-medium shadow-md hover:scale-110 text-white rounded-lg p-1'
              onClick={openModal}
            >
              Top-up
            </button>
          </div>
          <p>Last top-up: ₵500</p>
          <p className='text-center 2xl:py-10 py-8 text-[2.5rem] self-center font-semibold text-green-400'>
            <span className='text-2xl'>₵</span>85.00
          </p>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#BC7674]'></div>
              <p className='text-lg font-semibold'>920</p>
              <p className='text-sm text-[#1E1E1E]'>Scheduled</p>
            </div>
            <div className='flex flex-col gap-1 '>
              <div className='w-5 h-2 rounded-xl bg-[#00DBDB]'></div>
              <p className='text-lg font-semibold'>920</p>
              <p className='text-sm text-[#1E1E1E]'>Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-4 bg-white rounded-lg shadow-3xl mt-14 '>
        <NoSSRTable
          columns={columns}
          data={clientInsytData}
          title={tab === 'insyt' ? 'Forms' : 'Messages'}
          searchParameter='campaignName'
        />
      </div>
      <Modal modalState={isOpen} close={closeModal} />
    </>
  );
};

export default UserDetails;
