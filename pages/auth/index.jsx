import Image from 'next/image';
import api from '@/utils/axiosInstance';
import Spinner from '../../components/svgs/Spinner';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthProvider';
const defaultValues = {
  email: '',
  password: '',
};

const Login = () => {
  const { loginUser, saveToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <div className='grid h-screen grid-cols-8 font-sans max-w-[2000px] px-8 md:px-5 lg:px-0 '>
      <div className=' hidden col-span-2 bg-[#055189] xl:flex flex-col items-center justify-between py-10 px-5 3xl:px-10'>
        <Image
          src='/images/white_logo.png'
          alt='logo'
          width={150}
          height={300}
          className='self-start'
        />
        <Image src='/images/x00cagdh.png' alt='logo' width={400} height={400} />
        <div className='flex flex-row items-center justify-between w-full text-white 3xl:px-6'>
          <p className='cursor-pointer'>About</p>
          <p className='cursor-pointer'>Privacy</p>
          <p className='cursor-pointer'>Terms of Use</p>
          <p className='cursor-pointer'>FAQ</p>
        </div>
      </div>
      <div className='flex flex-row items-center col-span-8 xl:col-span-6 xl:ml-32'>
        <div className='flex flex-row w-full  min-h-[40vh] md:min-h-fit justify-evenly '>
          <form
            className='flex flex-col justify-center   xl:w-[40%] 3xl:w[30%]'
            action=''
            onSubmit={handleSubmit(async data => {
              setIsLoading(true);
              await api
                .post('/auth/login', data)
                .then(res => {
                  saveToken(res.data);
                  loginUser();
                  setIsLoading(false);
                })
                .catch(() => {
                  setIsLoading(false);
                  alert('Invalid login or password');
                });
            })}
          >
            <div className='md:w-[80%] lg:w-full space-y-6'>
              <div className='text-[#055189] text-xl xl:text-2xl '>
                <p>Login to your</p>
                <p>management dashboard</p>
              </div>
              <input
                type='text'
                placeholder={`${
                  errors.email ? errors.email.message : 'Username'
                }`}
                className={`px-3 py-2 w-full  border-2 rounded border-[#54545980] focus:outline-none ${
                  errors.email && 'border-error'
                }`}
                {...register('email', {
                  required: 'Enter valid email address',
                })}
              />
              <input
                type='password'
                placeholder={`${
                  errors.password ? errors.password.message : 'Password'
                }`}
                className={`px-3 py-2 w-full   border-2 rounded border-[#54545980] focus:outline-none ${
                  errors.password && 'border-error'
                }`}
                {...register('password', { required: 'Enter valid password' })}
              />
              <div className='flex flex-row items-center justify-between w-full'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className={`bg-[#055189] text-white flex items-center  shadow-md font-medium  rounded-lg gap-1 px-5  py-1  3xl:text-lg ${
                    isLoading && 'animate-pulse'
                  }`}
                >
                  LOGIN{isLoading && <Spinner />}
                </button>
                <p className='text-xs underline cursor-pointer 3xl:text-base decoration-dashed underline-offset-4 text-[#055189]'>
                  Forgot User ID or Password?
                </p>
              </div>
            </div>
          </form>

          <Image
            src='/images/Meeting.svg'
            width={500}
            height={500}
            className='hidden object-cover xl:block '
          />
          <Image
            src='/images/Meeting.svg'
            width={300}
            height={500}
            className='hidden object-cover md:block xl:hidden'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
