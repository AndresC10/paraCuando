import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckIcon } from '../components/assets/svg/CheckIcon';
import { ErrorIcon } from '../components/assets/svg/ErrorIcon';
import { Exit } from '../components/assets/svg/Exit';
import { PasswordIcon } from '../components/assets/svg/PasswordIcon';
import { NextPageWithLayout } from './page';

const SignIn: NextPageWithLayout = () => {
  type FormValues = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const [inputPass, setInputPass] = useState(true);

  const submit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    axios
      .post(
        'https://paracuando-academlo-api.academlo.tech/api/v1/auth/login',
        data
      )
      .then((res) => {
        Cookies.set('token', res.data.token);

        router.push('/');
        console.log(res.data);
      })
      .catch((err) => {
        onError(err);
      });

    reset({
      password: '',
    });
  };

  const onError = (err: AxiosError) => {
    if (err.response.status === 401) {
      setError('password', { message: 'error' });
      setError('email', { message: 'check' });
    }
    if (err.response.status === 404) {
      setError('email', { message: 'error message' });
    }
    console.log(err);
  };

  return (
    <div className='background-opacity min-h-[100vh] min-w-[100vw] bg-cover bg-center bg-no-repeat bg-[url("/login-banner.png")] flex justify-center items-center flex-col sm:flex-row gap-[17px] sm:gap-[0px] lg:gap-[208px] p-[18px]'>
      <div className="relative w-[85px] h-[86px] sm:w-[70%] sm:h-[25vw] md:w-[47%] lg:w-[253px] lg:h-[250px]">
        <Image
          className="z-50"
          src={'/sign_in-logo.png'}
          alt={'logo'}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="z-50 bg-black/70 min-h-[529px] w-[100%] max-w-[557px] pt-[18px] pl-[38px] pr-10 border-[1px] border-[#A7A6A7] rounded-[20px]">
        <header className="text-white mb-6">
          <Exit />
          <h1 className="text-[32px] font-semibold leading-5 mt-10 mb-[13px]">
            ¡Hola!
          </h1>
          <h2 className="text-[14px]">
            Inicie sesión con los datos que ingresó durante su registro.
          </h2>
        </header>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
          <div className="w-[100%] max-h-[76px]">
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4 z-10 "
              {...register('email', {
                required: {
                  value: true,
                  message: 'error message',
                },
              })}
            />
            {errors.email?.message == 'error message' && (
              <div className="flex justify-end pr-3 -translate-y-[34px] relative -z-10">
                <ErrorIcon />
              </div>
            )}
            {errors.email?.message == 'check' && (
              <div className="flex justify-end pr-3 -translate-y-[34px] relative -z-10">
                <CheckIcon />
              </div>
            )}
          </div>
          <div className="w-[100%] max-h-[76px] relative">
            <label className="text-white font-semibold" htmlFor="password">
              Contraseña
            </label>
            <input
              type={inputPass ? 'password' : 'text'}
              id="password"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
              {...register('password', {
                required: true,
              })}
            />
            <div
              onClick={() => setInputPass(!inputPass)}
              className="pr-3 -translate-y-[35px] absolute right-0 cursor-pointer"
            >
              <PasswordIcon />
            </div>
            {errors.password?.message && (
              <div className="flex justify-end pr-3 -translate-y-[34px] relative right-10 -z-10">
                <ErrorIcon />
              </div>
            )}
          </div>
          <div className="flex h-5 gap-1 mt-2 md:justify-center ">
            <span className="text-[40px] text-[#D9D9D9] rotate-180 translate-y-3 h-10 md:hidden ">
              .
            </span>
            <span className="text-[12px] md:text-[14px] leading-6 font-Inter text-[#D9D9D9] md:mt-0">
              ¿Olvidaste tu contraseña?{' '}
              <Link
                className="font-Inter text-[#F3F243] underline"
                href={'/password_recovery'}
              >
                Recupérala Aqui
              </Link>
            </span>
          </div>
          <div className="w-[100%] mt-5 md:mt-3 flex flex-col items-center gap-[15px]">
            <button
              type="submit"
              className="text-[16px] leading-6 font-semibold text-center font-Inter w-[100%] h-[45px] bg-[#F3F243] rounded-md"
            >
              Inicia sesión
            </button>
            <Link
              href={'/sign_up'}
              className="text-[15px] leading-6 font-normal font-Inter text-[#F3F243] underline"
            >
              O Crea una cuenta nueva
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
