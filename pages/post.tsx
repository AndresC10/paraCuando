import Link from 'next/link';
import { title } from 'process';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from './page';
import {
  createPublication,
  useTags,
} from '../lib/services/publications.services';
import { usePublicationsTypes } from '../lib/services/publications-types.services';

const Post: NextPageWithLayout = () => {
  const [step, setStep] = useState<number>(1);
  const [imageURLs, setImageURLs] = useState<Array<string | null>>([
    null,
    null,
    null,
  ]);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  const {
    data: publicationsTypesResponse,
    error: errorPublicationsTypes,
    isLoading: isLoadingPublicationsTypes,
  } = usePublicationsTypes();
  const {
    data: tagsResponse,
    error: errorTags,
    isLoading: isLoadingTags,
  } = useTags();

  const publicationsTypes = publicationsTypesResponse?.results.results;
  const tags = tagsResponse?.results.results;

  // https://paracuando-academlo-api.academlo.tech/api/v1/publications

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    // Define los tipos de datos para el objeto FormData
    // Por ejemplo:
    title: string;
    description: string;
    content: string;
    reference_link: string;
    publication_type_id: string;
    tags: string;
    //...
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      formData.append('title', 'Prueba 8');
      formData.append('description', 'description prueba 7');
      formData.append('content', 'content prueba 7');
      formData.append('reference_link', 'reference_link prueba 7');
      formData.append('publication_type_id', '1');
      formData.append('tags', '1');

    //  return console.log(formData)
      // imageURLs.forEach((url, index) => {
      //   if (url) {
      //     const fileInputRef = [fileInputRef1, fileInputRef2, fileInputRef3][index];
      //     const file = fileInputRef.current?.files?.[0];
      //     if (file) {
      //       formData.append(`image-${index + 1}`, file);
      //     }
      //   }
      // });

      const response = await createPublication(formData);

      // Verifica si la respuesta es exitosa antes de continuar
      if (response.status === 200 || response.status === 201) {
        // Realiza acciones adicionales como limpiar el formulario o redirigir al usuario
        console.log('Publicación creada con éxito:', response.data);
      } else {
        console.error('Error al crear la publicación:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  const handleNext = () => {
    if (title.includes('')) {
      return console.log('no puede estar vacio');
    }
    setStep(step + 1);
  };

  const defaultValues = {
    title: '',
    type: '',
    category: '',
    recomendation: '',
    link: '',
  };

  const handleBack = () => {
    setStep(step - 1);
    reset(defaultValues);
  };

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      console.log('No file provided');
      return;
    }
    const urlFile = URL.createObjectURL(file);
    const urlFile2 = URL.createObjectURL(file);
    const urlFile3 = URL.createObjectURL(file);
    setImageURLs([urlFile, urlFile2, urlFile3]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageURLs = [...imageURLs];
        newImageURLs[index] = reader.result as string;
        setImageURLs(newImageURLs);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="bg-app-blue sm:w-[25%] xs:w-full sm:min-w-[200px] h-[306px] sm:h-screen flex flex-col">
        <div className="flex flex-col justify-center items-center sm:mt-32">
          <img
            className="xs:w-[137px] sm:w-1/2 mt-2"
            src="/paraCuando.png"
            alt="Titulo para cuando"
          />
          <img src="/paraCuando2.png" alt="Subtitulo para cuando" />
        </div>
        <div className="mt-4 sm:mt-20 flex flex-col justify-start items-start mx-6 gap-4">
          <h2 className="app-title-3 font-medium text-app-yellow">
            ¡Bienvenido, creador!
          </h2>
          <p className="app-subtitle-2 text-white">
            A continuación puedes completar la info de la marca, artista o
            torneo que quieres cerca.
          </p>
        </div>
        <div className="mt-56 flex justify-start mx-6">
          <Link href={'/ayuda'}>
            <p className="text-white app-text-2">Ayuda</p>
          </Link>
        </div>
      </div>
      <div className="sm:w-[65%] sm:h-screen">
        {step === 1 ? (
          <>
            <Link
              className="app-title-3 font-medium text-app-blue relative top-4 ml-4 sm:ml-10 sm:top-10"
              href={'./'}
            >
              Back
            </Link>
          </>
        ) : (
          <>
            <button
              className="app-title-3 font-medium text-app-blue relative top-4 ml-4 sm:ml-10 sm:top-10"
              onClick={handleBack}
            >
              Back
            </button>
          </>
        )}

        <div
          
          className="flex flex-col items-center gap-4 w-full max-w-[800px] mx-auto mt-20 h-[699px] rounded-2xl"
        >
          {step === 1 ? (
            <>
              <div
                className="w-[80%] h-2 bg-app-grayLight sm:mt-10 rounded-2xl card-shadow"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, blue 50%, gray 50%)',
                }}
              ></div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-2 items-start w-[80%]">
                <h2 className="app-title-2 mt-4 ">Publicacion</h2>
                <h3 className="app-subtitle-2 text-app-grayDark">
                  Informacion basica
                </h3>
                <div className="w-full mt-4">
                  <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[185px] bg-white z-50">
                    Titulo de publicación
                  </p>
                  <input
                    {...register('title', { required: true })}
                    type="text"
                    className="relative border-2 block w-full h-14 -mt-3 rounded-2xl z-0 pl-4"
                  />
                  <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[185px] bg-white z-50">
                    Tde
                  </p>
                  <input
                    {...register('description', { required: true })}
                    type="text"
                    className="relative border-2 block w-full h-14 -mt-3 rounded-2xl z-0 pl-4"
                  />
                  <div className="relative mt-6 flex gap-4">
                    <select
                      {...register('publication_type_id', { required: true })}
                      className="text-app-gray relative w-[50%] h-14 border-2 rounded-2xl"
                      name="publication_type_id"
                      id="publication_type_id"
                    >
                      <option value="">Tipo</option>
                      {publicationsTypes?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      {...register('tags', { required: true })}
                      className="text-app-gray relative w-[50%] h-14 border-2 rounded-2xl"
                      name="tags"
                      id="tags"
                    >
                      <option value="">Category</option>
                      {tags?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-6 ">
                    <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[210px] bg-white z-50">
                      ¿Por qué lo recomiendas?
                    </p>
                    <textarea
                      {...register('content', { required: true })}
                      className="w-full -mt-3 border-2 rounded-2xl pl-4 pt-4"
                      name="content"
                      id="content"
                    ></textarea>
                  </div>
                  <div className="mt-6 w-full">
                    <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[175px] bg-white z-50">
                      Link De Referencia
                    </p>
                    <input
                      {...register('reference_link', { required: true })}
                      type="text"
                      className="relative border-2 block w-full h-14 -mt-3 rounded-2xl z-0 pl-4"
                      name="reference_link"
                      id="reference_link"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full mt-10">
                    <button
                      type="submit"
                      // onClick={handleNext}
                      className="app-subtitle-1 w-32 h-12 bg-app-blue rounded-full text-white"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div
                className="w-[80%] h-2 bg-app-grayLight sm:mt-10 rounded-2xl card-shadow"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, blue 100%, gray 0%)',
                }}
              ></div>
              <div className="mt-5 flex flex-col gap-2 items-start w-[80%]">
                <h2 className="app-title-2 mt-4 ">Fotos</h2>
                <h3 className="app-subtitle-2 text-app-grayDark">
                  Selecciona máximo tres fotos para crear una galería
                </h3>
                <div className="flex flex-row justify-around items-center mt-4 w-full h-[168px] sm:h-[257px] border-[1px] rounded-2xl">
                  <label
                    htmlFor="archivo1"
                    className="relative bg-cover bg-no-repeat flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    style={
                      imageURLs[0]
                        ? { backgroundImage: `url(${imageURLs[0]})` }
                        : { backgroundColor: '' }
                    }
                  >
                    <input
                      onChange={(e) => handleFileChange(0, e)}
                      type="file"
                      id="archivo1"
                      className="hidden"
                      ref={fileInputRef1}
                    />
                    {!imageURLs[0] && <p>+</p>}
                  </label>
                  <label
                    htmlFor="archivo2"
                    className="relative bg-cover bg-no-repeat flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    style={
                      imageURLs[1]
                        ? { backgroundImage: `url(${imageURLs[1]})` }
                        : { backgroundColor: '' }
                    }
                  >
                    <input
                      onChange={(e) => handleFileChange(1, e)}
                      type="file"
                      id="archivo2"
                      className="hidden"
                      ref={fileInputRef2}
                    />
                    {!imageURLs[1] && <p>+</p>}
                  </label>
                  <label
                    htmlFor="archivo3"
                    className="relative bg-cover bg-no-repeat flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    style={
                      imageURLs[2]
                        ? { backgroundImage: `url(${imageURLs[2]})` }
                        : { backgroundColor: '' }
                    }
                  >
                    <input
                      onChange={(e) => handleFileChange(2, e)}
                      type="file"
                      id="archivo3"
                      className="hidden"
                      ref={fileInputRef3}
                    />
                    {!imageURLs[2] && <p>+</p>}
                  </label>
                </div>
                <div className="flex items-center justify-center w-full mt-10">
                  <button
                    type="submit"
                    className="app-subtitle-1 w-32 h-12 bg-app-blue rounded-full text-white"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
