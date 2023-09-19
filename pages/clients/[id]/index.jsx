import Modal from '@/components/Modal';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useState, useContext, useRef } from 'react';
import { LuMoreVertical } from 'react-icons/lu';
import { FiSettings } from 'react-icons/fi';
import { useClientProfile, useTableData } from '../../../hooks/fetchers';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthProvider';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const Action = ({ push, open, id, setOpen, dropDownref }) => {
  const closeDropDown = () => {
    if (open) setOpen('');
  };

  useOutsideClick(closeDropDown, dropDownref);
  return (
    <div ref={dropDownref}>
      <LuMoreVertical
        className='text-2xl cursor-pointer'
        onClick={() => setOpen(id)}
      />
      {!push ? (
        <div
          className={`${
            open === id ? 'block' : 'hidden'
          } absolute p-2 space-y-2 lg:text-base text-sm font-medium bg-white z-50 shadow-lg  left-1 md:left-14 top-2`}
        >
          <p className='text-green-500 cursor-pointer hover:opacity-60'>
            Activate
          </p>
          <p className='text-red-500 cursor-pointer hover:opacity-60'>
            Deactivate
          </p>
        </div>
      ) : (
        <div
          className={`${
            open === id ? 'block' : 'hidden'
          } absolute p-3 space-y-2 font-medium bg-white z-50 shadow-lg left-1 top-2`}
        >
          <p className='text-green-500 cursor-pointer hover:opacity-60'>
            Resend
          </p>
          <p className='text-red-500 cursor-pointer hover:opacity-60'>Cancel</p>
        </div>
      )}
    </div>
  );
};

const UserDetails = () => {
  const router = useRouter();
  const dropDownref = useRef(null);
  const [tab, setTab] = useState('insyt');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState('');
  const { profile } = useClientProfile(router.query.id);
  const { user } = useContext(AuthContext);

  const {
    tableData: insyt,
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableDataIsLoading,
  } = useTableData('/clients/insyt-data');

  const {
    tableData: push,
    filterText: pushFilterText,
    handlePageNumberChange: pushPageNumberChange,
    setFilterText: pushSetFilterText,
    tableDataIsLoading: pushTableDataIsLoading,
  } = useTableData('/clients/push-data');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    if (modalIsOpen) setModalIsOpen(false);
  };

  const surveyColumns = [
    {
      name: 'Date Created',
      selector: 'dateCreated',
      sortable: true,
    },
    {
      name: 'Form Name',
      selector: 'formName',
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
        <Action
          id={row.formId}
          key={row.formId}
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          dropDownref={dropDownref}
        />
      ),
      center: true,
    },
  ];

  const pushColumns = [
    {
      name: 'Created',
      selector: 'dateCreated',
      sortable: true,
    },
    {
      name: 'Failed',
      selector: 'failed',
    },
    {
      name: 'Pending',
      selector: 'pending',
    },
    {
      name: 'Delivered',
      selector: 'delivered',
    },
    {
      name: 'Type',
      selector: 'messageType',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Action
          push
          id={row.messageId}
          key={row.messageId}
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          dropDownref={dropDownref}
        />
      ),
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
                    <p className='text-3xl font-semibold text-[#2A3547]'>
                      {profile?.client.clientName || (
                        <Skeleton count={1} width={'8rem'} borderRadius={10} />
                      )}
                    </p>
                  </div>
                  <p className='text-[#828282] text-sm mt-3'>
                    Joined on{' '}
                    {profile?.client.dateJoined || (
                      <Skeleton count={1} width={'8rem'} borderRadius={10} />
                    )}
                  </p>
                </div>
                <div className='flex flex-col justify-end'>
                  <p className='font-medium  text-[#2A3547] '>
                    {profile?.client.address || (
                      <Skeleton count={1} width={'8rem'} borderRadius={10} />
                    )}
                  </p>
                  <p className='font-medium text-sm text-[#2A3547] '>
                    {profile?.client.contact || (
                      <Skeleton count={1} width={'8rem'} borderRadius={10} />
                    )}
                  </p>
                  <p className='font-medium text-sm text-[#2A3547] '>
                    {profile?.client.email || (
                      <Skeleton count={1} width={'8rem'} borderRadius={10} />
                    )}
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-end justify-between '>
                <Link href={`/clients/${router.query.id}/settings`}>
                  <FiSettings className='text-xl text-[#2A3547] cursor-pointer hover:scale-125' />
                </Link>
                <div className='flex items-center gap-4 lg:hidden'>
                  <p className='hidden text-lg sm:block'>
                    Balance ₵
                    {profile?.client.smsBalance || (
                      <Skeleton count={1} width={'5rem'} borderRadius={10} />
                    )}
                  </p>
                  {user?.permissions?.includes(103) && (
                    <button
                      className='bg-[#F24E1E] hidden sm:block text-sm font-medium shadow-md hover:scale-110 text-white rounded-lg p-1'
                      onClick={openModal}
                    >
                      Top-up
                    </button>
                  )}
                  {user?.permissions?.includes(103) && (
                    <button
                      className='bg-[#F24E1E] text-2xl sm:hidden cursor-pointer  font-medium shadow-md hover:scale-110 text-white rounded-lg py-1 px-3'
                      onClick={openModal}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='bg-white mt-8 lg:mt-0 grid text-lg sm:text-xl  grid-cols-2 rounded-lg shadow-3xl sm:w-[50%]'>
              <p
                className={`text-center  font-medium rounded-lg py-2 cursor-pointer ${
                  tab === 'insyt' && 'bg-[#3D7DAD] text-white'
                }`}
                onClick={() => setTab('insyt')}
              >
                Surveys
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
          <p className='2xl:text-2xl text-xl font-semibold text-[#1252A6] mb-6'>
            Surveys
          </p>
          <p className='py-8 text-2xl font-semibold text-center 2xl:py-10 2xl:text-3xl'>
            {profile?.client.totalForms || (
              <Skeleton count={1} width={'3rem'} borderRadius={10} />
            )}
          </p>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#BC7674]'></div>
              <p className='text-lg font-semibold'>
                {profile?.client.inActive || (
                  <Skeleton count={1} width={'3rem'} borderRadius={10} />
                )}
              </p>
              <p className='text-sm text-[#1E1E1E]'>InActive</p>
            </div>
            <div className='flex flex-col gap-1 '>
              <div className='w-5 h-2 rounded-xl bg-[#00DBDB]'></div>
              <p className='text-lg font-semibold'>
                {profile?.client.active || (
                  <Skeleton count={1} width={'3rem'} borderRadius={10} />
                )}
              </p>
              <p className='text-sm text-[#1E1E1E]'>Active</p>
            </div>
          </div>
        </div>
        <div className='hidden lg:block col-span-2 px-4 py-5 3xl:mx-3 bg-white rounded-lg shadow-3xl max-h-[20rem]'>
          <div className='flex flex-row items-center justify-between w-full mb-6'>
            <p className='2xl:text-2xl text-xl font-semibold text-[#F24E1E]'>
              Push
            </p>
            {user?.permissions?.includes(103) && (
              <button
                className='bg-[#F24E1E] text-sm font-medium shadow-md hover:scale-110 text-white rounded-lg p-1'
                onClick={openModal}
              >
                Top-up
              </button>
            )}
          </div>

          <p className='self-center py-8 text-xl font-semibold text-center text-green-400 lg:text-2xl 2xl:py-10 2xl:text-3xl'>
            <span className='text-base 2xl:text-2xl'>₵</span>
            {profile?.client.smsBalance}
          </p>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-2 rounded-xl bg-[#BC7674]'></div>
              <p className='text-lg font-semibold'>
                {profile?.client.scheduled || (
                  <Skeleton count={1} width={'3rem'} borderRadius={10} />
                )}
              </p>
              <p className='text-sm text-[#1E1E1E]'>Scheduled</p>
            </div>
            <div className='flex flex-col gap-1 '>
              <div className='w-5 h-2 rounded-xl bg-[#00DBDB]'></div>
              <p className='text-lg font-semibold'>
                {profile?.client.delivered || (
                  <Skeleton count={1} width={'3rem'} borderRadius={10} />
                )}
              </p>
              <p className='text-sm text-[#1E1E1E]'>Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-4 bg-white rounded-lg shadow-3xl mt-14 '>
        {tab === 'insyt' ? (
          <NoSSRTable
            columns={surveyColumns}
            data={insyt?.paginatedData}
            title='Surveys'
            loading={tableDataIsLoading}
            totalRows={insyt?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
            options={['Active', 'Inactive']}
          />
        ) : (
          <NoSSRTable
            columns={pushColumns}
            data={push?.paginatedData}
            title='Messages'
            loading={pushTableDataIsLoading}
            totalRows={push?.totalRowCount}
            handlePerRowsChange={pushPageNumberChange}
            setFilterText={pushSetFilterText}
            filterText={pushFilterText}
          />
        )}
      </div>
      <Modal modalState={modalIsOpen} close={closeModal} />
    </>
  );
};

export default UserDetails;
