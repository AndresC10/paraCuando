import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Exit } from '../components/assets/svg/Exit';
import { NextPageWithLayout } from './page';

type FormValues = {
  email: string;
  name: string;
  last_name: string;
  password: string;
};

const SignUp: NextPageWithLayout = () => {
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const submit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    reset({
      email: '',
      name: '',
      last_name: '',
      password: '',
    });
  };

  return (
    <div className='min-h-[100vh] min-w-[100vw] bg-cover bg-center bg-no-repeat bg-[url("/login-banner.png")] flex justify-center items-center flex-col sm:flex-row gap-[17px] sm:gap-[0px] lg:gap-[208px] p-[18px]'>
      <div className="relative w-[85px] h-[86px] sm:w-[70%] sm:h-[25vw] md:w-[47%] lg:w-[253px] lg:h-[250px]">
        <Image
          src={'/sign_in-logo.png'}
          alt={'logo'}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="bg-black/70 min-h-[571px] w-[100%] max-w-[557px] pt-[18px] pl-[38px] pr-10 border-[1px] border-[#A7A6A7] rounded-[20px]">
        <header className="text-white mb-6">
          <Exit />
          <h1 className="text-[32px] leading-5 mb-[13px]">Todos votamos :)</h1>
          <h2 className="text-[14px]">Registrate para ingresar.</h2>
        </header>
        <form
          className="grid grid-cols-2 gap-2"
          onSubmit={handleSubmit(submit)}
        >
          <div className="w-[100%] col-span-2">
            <label
              className="text-white font-semibold flex flex-col"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
              {...register('email')}
            />
          </div>
          <div className="w-[100%] ">
            <label
              className="text-white font-semibold flex flex-col"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
              {...register('name')}
            />
          </div>
          <div className="w-[100%] ">
            <label
              className="text-white font-semibold flex flex-col"
              htmlFor="last_name"
            >
              Apellido
            </label>
            <input
              type="text"
              id="last_name"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
              {...register('last_name')}
            />
          </div>
          <div className="w-[100%] col-span-2">
            <label
              className="text-white font-semibold flex flex-col"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
              {...register('password')}
            />
            <div className="flex h-10 gap-1 mt-2">
              <span className="text-[40px] text-[#D9D9D9] rotate-180 translate-y-3 h-10">
                .
              </span>
              <span className="text-[12px] font-Inter text-[#D9D9D9]">
                La contraseña debe tener números, minúsculas y mayúsculas.
              </span>
            </div>
          </div>
          <div className="w-[100%] col-span-2 mt-5 flex flex-col items-center gap-[15px]">
            <button className="text-[16px] leading-6 font-semibold text-center font-Inter w-[100%] h-[45px] bg-[#F3F243] rounded-md">
              Crear cuenta
            </button>
            <Link
              href={'/sign_in'}
              className="text-[15px] leading-6 font-normal font-Inter text-[#F3F243] underline"
            >
              O inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
