import AdminModal from '@/components/AdminModal';
import DeleteModal from '@/components/DeleteModal';
import EditAdminModal from '@/components/EditAdminModal';
import ClientSettingsLayout from '@/components/ClientSettingsLayout';
import { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useClientProfile } from '@/hooks/fetchers';
import { useRouter } from 'next/router';

const Admins = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { profile } = useClientProfile(router.query.id);

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
  return (
    <ClientSettingsLayout>
      <div className='pb-5 border-b-[1px] flex flex-row items-center justify-between'>
        <div>
          <p className='px-5 text-lg font-medium'>Collaborators</p>
          <p className='px-5 text-[#747474] text-sm'>List of collaborators</p>
        </div>
        <button
          onClick={openModal}
          className='bg-[#0FA958] text-white px-3 py-1 rounded-md font-semibold hover:scale-105'
        >
          Add New
        </button>
      </div>
      <div className='grid grid-cols-3 p-5'>
        <p className='text-lg font-medium text-left'>Name</p>
        <p className='text-lg font-medium text-center'>Role</p>

        <p className='text-lg font-medium text-center'>Action</p>
      </div>
      {profile?.collaborators.map(admin => (
        <div key={admin.name} className='grid grid-cols-3 p-5 '>
          <p className='text-lg font-medium text-[#747474] text-left'>
            {admin.name}
          </p>
          <p className='text-lg font-medium text-[#747474] text-center'>
            {admin.role}
          </p>

          <div className='flex flex-row items-center justify-center gap-2 text-xl font-medium'>
            <RiDeleteBin5Line className='text-[#E53E3E] hover:scale-110 cursor-pointer' />
          </div>
        </div>
      ))}

      <AdminModal modalState={isOpen} close={closeModal} />
      <EditAdminModal modalState={editModal} close={closeEditModal} />
      <DeleteModal modalState={deleteModal} close={closeDeleteModal} />
    </ClientSettingsLayout>
  );
};

export default Admins;
