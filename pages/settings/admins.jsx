import AdminModal from '@/components/AdminModal';
import DeleteModal from '@/components/DeleteModal';
import EditAdminModal from '@/components/EditAdminModal';
import SettingsLayout from '@/components/SettingsLayout';
import dynamic from 'next/dynamic';
import PermissionsModal from '@/components/PermissionsModal';
import { AiOutlineEye } from 'react-icons/ai';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useTableData } from '@/hooks/fetchers';
import { useRouter } from 'next/router';

const NoSSRTable = dynamic(() => import('@/components/DataTableBase'), {
  ssr: false,
});

const Admins = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [permissionsModal, setPermissionsModal] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    filterText,
    handlePageNumberChange,
    setFilterText,
    tableData,
    tableDataIsLoading,
    handlePageChange,
  } = useTableData(
    'https://internal-manager-api.onrender.com/api/admins',
    true
  );

  const adminColumns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role.name,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
    },
    {
      name: 'Manage',
      cell: row => (
        <div className=' text-2xl text-[#699BF7] cursor-pointer'>
          <AiOutlineEye
            onClick={() => {
              router.push(`/settings/admins?id=${row.uuid}`);
              setPermissionsModal(true);
            }}
          />
        </div>
      ),
      center: true,
    },
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const closePermissionsModal = () => {
    setPermissionsModal(false);
  };
  return (
    <SettingsLayout>
      {user?.permissions?.includes(101) ? (
        <div>
          <div className='pb-5 border-b-[1px] flex flex-row items-center justify-between'>
            <div>
              <p className='px-5 text-lg font-medium'>Administrators</p>
              <p className='px-5 text-[#747474] text-sm'>
                List of administrator accounts
              </p>
            </div>
            <button
              onClick={openModal}
              className='bg-[#0FA958] text-white px-3 py-1 rounded-md font-semibold hover:scale-105'
            >
              Add Admin
            </button>
          </div>

          <NoSSRTable
            searchParameter='name'
            data={tableData?.paginatedData}
            columns={adminColumns}
            loading={tableDataIsLoading}
            totalRows={tableData?.totalRowCount}
            handlePerRowsChange={handlePageNumberChange}
            setFilterText={setFilterText}
            filterText={filterText}
            handlePageChange={handlePageChange}
            hidden
          />
          <AdminModal modalState={isOpen} close={closeModal} />
          <EditAdminModal modalState={editModal} close={closeEditModal} />
          <DeleteModal modalState={deleteModal} close={closeDeleteModal} />
          <PermissionsModal
            modalState={permissionsModal}
            close={closePermissionsModal}
          />
        </div>
      ) : (
        <p className='flex items-center justify-center w-full h-full'>
          Unauthorized
        </p>
      )}
    </SettingsLayout>
  );
};

export default Admins;
