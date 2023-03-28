import Link from 'next/link';
import { NextPageWithLayout } from './page';

const PasswordRecovery: NextPageWithLayout = () => {
  return (
    <div className='min-h-[100vh] min-w-[100vw] bg-cover bg-center bg-no-repeat bg-[url("/login-banner.png")] flex justify-center items-center flex-col sm:flex-row gap-[17px] sm:gap-[0px] lg:gap-[208px] p-[18px]'>
      <div className="bg-black/70 min-h-[571px] xxs:min-h-[529px] w-[100%] max-w-[557px] pt-[18px] pl-[38px] pr-10 border-[1px] border-[#A7A6A7] rounded-[20px]">
        <header className="text-white mb-6">
          <h1 className="text-[32px] font-semibold leading-[37.5px] mt-10 mb-[13px]">
            Encontrémos tu cuenta
          </h1>
          <h2 className="text-[14px] leading-5">
            Para restablecer tu contraseña, escribe la dirección de correo
            electrónico que puedes haber utilizado con Para cuándo?
          </h2>
        </header>
        <main className="flex flex-col gap-32">
          <div className="w-[100%]">
            <input
              type="text"
              id="email"
              placeholder="johndoe@mail.com"
              className="text-[16px] leading-6 font-normal font-Inter outline-0 text-white w-[100%] h-12 mt-1 bg-black/0 border-[1px] border-white rounded-md pl-4"
            />
          </div>
          <div className="w-[100%] h-auto col-span-2 md:mt-3 flex flex-col items-center gap-[15px]">
            <button className="text-[16px] leading-5 font-semibold text-center font-Inter w-[100%] h-auto min-h-[45px] bg-[#F3F243] rounded-md">
              Enviar correo de restablecimiento de contraseña
            </button>
            <Link
              href={'/sign_up'}
              className="text-[15px] leading-6 font-normal font-Inter text-[#F3F243] underline"
            >
              O inicia sesión
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PasswordRecovery;
