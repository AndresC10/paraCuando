import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Layout } from '../../components/layout/Layout';
import { alertSuccess } from '../../lib/helpers/alert.helper';
import axios from '../../lib/helpers/axios.helper';
import { useUserMe } from '../../lib/services/userMe.services';
import { NextPageWithLayout } from '../page';

type FormValues = {
  image_url?: File[];
  first_name?: string;
  last_name?: string;
};

export const ConfigPage: NextPageWithLayout = () => {
  const { data } = useUserMe();
  const { data: userData } = useSWR(() =>
    data && data.id ? '/users/' + data.id : null
  );

  console.log(data);

  const { register, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      image_url: userData?.results.image_url,
      first_name: userData?.results.first_name,
      last_name: userData?.results.last_name,
    },
  });

  const [profileImg, setProfileImg] = useState<string>();

  const getImageUrl = () => {
    const imageURL = getValues('image_url');
    if (imageURL && imageURL.length > 0) {
      return URL.createObjectURL(imageURL[0]);
    } else {
      return 'default_image_url';
    }
  };

  const submit = (fdata: FormValues) => {
    const imageData = new FormData();

    async function submitImage() {
      axios
        .post(`/users/${data?.id}/add-image`, imageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    if (fdata.image_url) {
      for (let index = 0; index < fdata.image_url.length; index++) {
        imageData.append('image', fdata.image_url[index]);
      }
    }

    const dataObj = {
      first_name: fdata.first_name,
      last_name: fdata.last_name,
    };

    axios
      .put(`/users/${data?.id}`, dataObj)
      .then(alertSuccess('Perfil actualizado correctamente'))
      .catch((err) => console.log(err));
    if (profileImg) {
      submitImage();
    }
  };

  return (
    <>
      <div className="w-[100%] h-[129px] bg-[#1B4DB1] flex items-center pl-[170px]">
        <Link href={'/profile/1'} className="text-[48px] font-black text-white">
          Perfil
        </Link>
      </div>
      <form
        className="w-[100%] flex flex-col items-center"
        onSubmit={handleSubmit(submit)}
      >
        <h2 className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] text-[24px] text-center md:text-left font-medium pb-[30px] pt-[72px] p-4">
          Informacion de contacto
        </h2>
        <div className="xs:max-w-[375px] sm:max-w-[600px] w-[100%] md:max-w-[940px] p-4">
          <div className="w-[100%] flex flex-col md:flex-row gap-20">
            <div className="place-self-center">
              {data?.image_url ? (
                <div className="w-[220px] h-[206px] rounded-[15px] mb-[19px] relative overflow-hidden">
                  <Image
                    src={
                      profileImg
                        ? getImageUrl()
                        : `${data?.image_url + '?v=' + Date.now()}`
                    }
                    fill
                    alt=""
                  />
                </div>
              ) : (
                <div
                  className={`w-[220px] h-[206px] rounded-[15px] mb-[19px] 'bg-[#D9D9D9]'
                `}
                ></div>
              )}

              {/* <div
                className={`w-[220px] h-[206px]  rounded-[15px] mb-[19px] 'bg-[#D9D9D9]'
                `}
                style={
                  data?.image_url
                    ? { backgroundImage: `url(${data?.image_url})` }
                    : { backgroundColor: '#D9D9D9' }
                }
              ></div> */}
              <label className="text-[16px] text-[#6E6A6C] cursor-pointer">
                Agrega una foto para tu perfil
                <input
                  type="file"
                  className="hidden"
                  {...register('image_url', {
                    onChange() {
                      setProfileImg(getImageUrl());
                    },
                  })}
                />
              </label>
            </div>
            <div className="w-[100%] flex flex-col justify-center gap-[53px] -translate-y-[19px]">
              <label className="relative" htmlFor="firstName">
                <input
                  id="firstName"
                  className="w-full px-5 py-2 duration-100 border peer rounded-xl focus:ring-1 focus:ring-app-blue focus:outline-none border-app-grayDark "
                  type="text"
                  placeholder={userData?.results.first_name}
                  {...register('first_name')}
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
                  placeholder={userData?.results.last_name}
                  {...register('last_name')}
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
      </form>
    </>
  );
};

ConfigPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ConfigPage;
