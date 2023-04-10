import Link from 'next/link';
import { Layout } from '../../components/layout/Layout';
import { NextPageWithLayout } from '../page';

export const ConfigPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="w-[100%] h-[129px] bg-[#1B4DB1] flex items-center pl-[170px]">
        <Link href={'/profile/1'} className="text-[48px] font-black text-white">
          Perfil
        </Link>
      </div>
      <div className="w-[100%] flex flex-col items-center">
        <h2 className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] text-[24px] text-center md:text-left font-medium pb-[30px] pt-[72px] p-4">
          Informacion de contacto
        </h2>
        <div className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] p-4">
          <div className="w-[100%] flex flex-col md:flex-row gap-20">
            <div className="place-self-center">
              <div className="w-[220px] h-[206px] bg-[#D9D9D9] rounded-[15px] mb-[19px]"></div>
              <span className="text-[16px] text-[#6E6A6C]">
                Agrega una foto para tu perfil
              </span>
            </div>
            <div className="w-[100%] flex flex-col justify-center gap-[53px] -translate-y-[19px]">
              <label className="relative" htmlFor="firstName">
                <input
                  id="firstName"
                  className="w-full px-5 py-2 duration-100 border peer rounded-xl focus:ring-1 focus:ring-app-blue focus:outline-none border-app-grayDark "
                  type="text"
                  value=""
                />
                <span className="absolute text-base cursor-text text-app-grayDark whitespace-nowrap left-4 bg-white px-1 rounded-none -translate-y-3">
                  First Name
                </span>
              </label>
              <label className="relative" htmlFor="lastName">
                <input
                  id="lastName"
                  className="w-full px-5 py-2 duration-100 border peer rounded-xl focus:ring-1 focus:ring-app-blue focus:outline-none border-app-grayDark "
                  type="text"
                  value=""
                />
                <span className="absolute text-base cursor-text text-app-grayDark whitespace-nowrap left-4 bg-white px-1 rounded-none -translate-y-3">
                  Last Name
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-[57px] flex flex-col items-center">
          <h2 className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] text-[24px] font-medium text-center lg:text-left">
            Mis intereses
          </h2>
          <div className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] mt-[29px] flex flex-col md:flex-row justify-center gap-[20px]">
            <div className="flex flex-col items-center">
              <div className="mb-[19px] w-[250px] lg:w-[300px] h-[152px] rounded-[15px] bg-[#D9D9D9]"></div>
              <span className="text-[16px] text-[#6E6A6C]">
                Añade una categoria
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-[19px] w-[250px] lg:w-[300px] h-[152px] rounded-[15px] bg-[#D9D9D9]"></div>
              <span className="text-[16px] text-[#6E6A6C]">
                Añade una categoria
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-[19px] w-[250px] lg:w-[300px] h-[152px] rounded-[15px] bg-[#D9D9D9]"></div>
              <span className="text-[16px] text-[#6E6A6C]">
                Añade una categoria
              </span>
            </div>
          </div>
          <div className="mt-[43px] mb-[86px] flex justify-center">
            <button className="w-[183px] h-[47px] bg-[#1B4DB1] text-[16px] font-Inter font-semibold text-white rounded-[32px]">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ConfigPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ConfigPage;
