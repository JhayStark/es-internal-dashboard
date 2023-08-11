import Image from 'next/image';
import api from '@/utils/axiosInstance';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthProvider';
import Spinner from '../../components/svgs/Spinner';

const Login = () => {
  const { loginUser, saveToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <>
      <div className='grid h-screen grid-cols-8 font-sans'>
        <div className='col-span-2 bg-[#055189] flex flex-col items-center justify-between py-10 px-5 3xl:px-10'>
          <Image
            src='/images/white_logo.png'
            alt='logo'
            width={150}
            height={300}
            className='self-start'
          />
          <Image
            src='/images/x00cagdh.png'
            alt='logo'
            width={400}
            height={400}
          />
          <div className='flex flex-row items-center justify-between w-full text-white 3xl:px-6'>
            <p className='cursor-pointer'>About</p>
            <p className='cursor-pointer'>Privacy</p>
            <p className='cursor-pointer'>Terms of Use</p>
            <p className='cursor-pointer'>FAQ</p>
          </div>
        </div>
        <div className='flex flex-row items-center col-span-6 lg:ml-32'>
          <div className='flex flex-row w-full justify-evenly'>
            <form
              className='flex flex-col justify-between w-[40%] 3xl:w[30%]'
              action=''
              onSubmit={handleSubmit(async data => {
                setIsLoading(true);
                await axios
                  .post('/auth/login', data)
                  .then(res => {
                    console.log(res);
                    saveToken(res.data);
                    loginUser();
                    setIsLoading(false);
                  })
                  .catch(e => console.log(e));
              })}
            >
              <div className='text-[#055189] text-2xl 3xl:text-3xl '>
                <p>Login to your</p>
                <p>management dashboard</p>
              </div>
              <input
                type='text'
                placeholder='USER ID'
                className='p-2 3xl:p-4 mt-10 mb-5 border-2 rounded border-[#54545980] '
                {...register('email', { required: true })}
              />
              <input
                type='password'
                placeholder='PASSWORD'
                className='p-2 3xl:p-4 mb-5 border-2 rounded border-[#54545980]'
                {...register('password', { required: true })}
              />
              <div className='flex flex-row items-center justify-between w-full'>
                <button
                  type='submit'
                  className='bg-[#055189] text-white py-1 rounded-full px-10 3xl:py-2 3xl:px-16 3xl:text-lg'
                >
                  {isLoading ? <Spinner /> : 'LOGIN'}
                </button>
                <p className='text-xs underline 3xl:text-base decoration-dashed underline-offset-4 text-[#055189]'>
                  Forgot User ID or Password?
                </p>
              </div>
            </form>
            <div className='w-[370px] 3xl:w-[482px] h-[300px] 3xl:h-[390px] relative '>
              <Image
                src='/images/Meeting.svg'
                fill={true}
                className='object-cover '
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
