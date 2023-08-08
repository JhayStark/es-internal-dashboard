import { useEffect, useState } from 'react';
import { usePermissions, useSingleAdmin } from '../hooks/fetchers';
import { useRouter } from 'next/router';
import api from '../utils/axiosInstance';

const CheckBox = ({ permission, singleAdmin }) => {
  const [toggled, setToggled] = useState(false);
  const toggleCheck = singleAdmin?.permissions.includes(permission.code);

  useEffect(() => {
    setToggled(toggleCheck);
  }, []);

  const updatePermission = async updatedState => {
    await api
      .put('/admins/toggle-permission', {
        adminUUID: singleAdmin?.uuid,
        permissionCode: permission.code,
        enable: updatedState,
      })
      .then(() => alert('Toggled'))
      .catch(() => alert('Error'));
  };

  const onChange = () => {
    setToggled(prev => !prev);
    updatePermission(!toggleCheck);
  };
  return (
    <div className='flex flex-row gap-1'>
      <input
        type='checkbox'
        name={permission?.name}
        id={permission?.name}
        value={permission.code}
        checked={toggled}
        onChange={onChange}
      />
      <p className='text-gray-600'>{permission?.name}</p>
    </div>
  );
};

const PermissionsModal = ({ modalState, close }) => {
  const router = useRouter();
  const [userPermissions, setUserPermissions] = useState([]);
  const { permissions } = usePermissions();
  const { singleAdmin } = useSingleAdmin(router.query.id);

  useEffect(() => {
    const adminPermissions = singleAdmin?.permissions;
    if (adminPermissions) setUserPermissions(adminPermissions);
  }, [singleAdmin]);

  return (
    <div>
      {modalState && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '>
          <div className='lg:w-[50%] 2xl:w-[40%] p-4 mx-auto bg-white rounded-lg shadow-lg'>
            <div className='mb-5 text-lg font-medium'>
              <p>{singleAdmin?.name}</p>
              <p>
                {singleAdmin?.role.name}, <span>{singleAdmin?.department}</span>
              </p>
            </div>
            <div className='grid grid-cols-2 gap-2 mb-5 text-sm sm:text-base 2xl:grid-cols-3'>
              {permissions?.map(permission => (
                <CheckBox permission={permission} singleAdmin={singleAdmin} />
              ))}
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={close}
                className='px-4 py-2 font-medium text-sm text-white bg-[#0FA958] rounded hover:scale-110'
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsModal;
