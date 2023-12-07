import Image from 'next/image';
import api from '@/utils/axiosInstance';
import Spinner from '../../components/svgs/Spinner';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthProvider';

const Login = () => {
  const { loginUser, saveToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <div className='grid h-screen grid-cols-8 font-sans max-w-[2000px] '>
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
        <div className='flex flex-row w-full min-h-[40vh] md:min-h-fit justify-evenly '>
          <form
            className='flex flex-col  justify-around  xl:w-[40%] 3xl:w[30%]'
            action=''
            onSubmit={handleSubmit(async data => {
              setIsLoading(true);
              await api
                .post('/auth', data)
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
            <div className='text-[#055189] text-xl xl:text-2xl '>
              <p>Login to your</p>
              <p>management dashboard</p>
            </div>
            <input
              type='text'
              placeholder={`${errors.email ? errors.email.message : 'User ID'}`}
              className={`p-3   border-2 rounded border-[#54545980] focus:outline-none ${
                errors.email && 'border-error'
              }`}
              {...register('email', { required: 'Enter valid email address' })}
            />
            <input
              type='password'
              placeholder={`${
                errors.password ? errors.password.message : 'Password'
              }`}
              className={`p-3   border-2 rounded border-[#54545980] focus:outline-none ${
                errors.password && 'border-error'
              }`}
              {...register('password', { required: 'Enter valid password' })}
            />
            <div className='flex flex-row items-center justify-between w-full'>
              <button
                type='submit'
                className='bg-[#055189] text-white py-1 rounded-full px-10 3xl:py-2 3xl:px-16 3xl:text-lg'
              >
                {isLoading ? <Spinner /> : 'LOGIN'}
              </button>
              <p className='text-xs underline cursor-pointer 3xl:text-base decoration-dashed underline-offset-4 text-[#055189]'>
                Forgot User ID or Password?
              </p>
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