import { useForm } from 'react-hook-form';
import api from '../utils/axiosInstance';

const AdminModal = ({ modalState, close }) => {
  const defaultValues = {
    name: '',
    role: '',
    department: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm(defaultValues);
  return (
    <div>
      {modalState && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-[2px] backdrop-invert-[20%] font-sans  '>
          <div className='w-[30%] p-4 mx-auto bg-white rounded-lg shadow-lg'>
            <h2 className='mb-4 text-xl font-bold'>Add New Admin</h2>
            <form
              onSubmit={handleSubmit(data => {
                api
                  .post('/admins/add-admins', {
                    ['admin_name']: data.name,
                    role: data.role,
                    department: data.department,
                    password: data.password,
                  })
                  .then(res => {
                    alert('added');
                  });
              })}
            >
              <div className='flex flex-col w-full gap-5 py-4'>
                <div className='flex flex-col w-full gap-2'>
                  <p>Name:</p>
                  <input
                    type='text'
                    className='border-[1px] py-3 px-5 rounded'
                    placeholder='John Doe'
                    {...register('name', { required: true })}
                  />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Role:</p>
                  <select
                    type='text'
                    className='border-[1px] bg-white py-3 px-5 rounded focus:outline-none'
                    placeholder='John Doe'
                    {...register('role', { required: true })}
                  >
                    <option value='1'>C.T.O</option>
                  </select>
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Department:</p>
                  <select
                    type='text'
                    className='border-[1px] bg-white py-3 px-5 rounded focus:outline-none'
                    placeholder='John Doe'
                    {...register('department', { required: true })}
                  >
                    <option value='1'>Tech</option>
                  </select>
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Password:</p>
                  <div className='flex flex-col w-full gap-2'>
                    <input
                      type='text'
                      className='border-[1px] bg-white py-3 px-5 rounded focus:outline-none'
                      placeholder='password'
                      {...register('password', { required: true })}
                    />
                    <div className='flex flex-row items-center gap-2'>
                      <input type='checkbox' name='' id='' className='' />
                      <p className='text-sm'>Auto Generate Password</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={close}
                  className='px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 font-bold text-white bg-[#0FA958] rounded hover:scale-110'
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModal;
