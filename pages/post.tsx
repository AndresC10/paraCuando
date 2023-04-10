import Link from 'next/link';
import { title, type, category, recomendation, link } from 'process';
import { useRef, useState } from 'react';
import { useForm} from 'react-hook-form';
import { NextPageWithLayout } from './page';

const Post: NextPageWithLayout = () => {
  const [step, setStep] = useState<number>(1);
  const [imageURLs, setImageURLs] = useState<Array<string | null>>([null, null, null]);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);


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
    type: string;
    category: string;
    recomendation: string;
    link: string;
    //...
  };

  const onSubmit = (data: FormData) => {
    
    setStep(step + 1);
  };

  const handleNext = () => {
    if(title.includes('') || type.includes('') || category.includes('') || recomendation.includes('') || link.includes('')) {
      return console.log('no puede estar vacio')
    }
    setStep(step + 1)
  }

  const defaultValues = {
    title: '',
    type: '',
    category: '',
    recomendation: '',
    link : ''
  }

  const handleBack = () => {
    setStep(step - 1)
    reset(defaultValues)
  }



  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

        <form
          onSubmit={handleSubmit(onSubmit)}
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
              <div className="mt-5 flex flex-col gap-2 items-start w-[80%]">
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
                  <div className="relative mt-6 flex gap-4">
                    <select
                      {...register('type', { required: true })}
                      className="text-app-gray relative w-[50%] h-14 border-2 rounded-2xl"
                      name="type"
                      id="type"
                    >
                      <option value="">Tipo</option>
                      <option value="branch-and-stores">
                        Marcas y Tiendas
                      </option>
                      <option value="music">Artistas y Conciertos</option>
                      <option value="events">Torneos</option>
                    </select>
                    <select
                      {...register('category', { required: true })}
                      className="text-app-gray relative w-[50%] h-14 border-2 rounded-2xl"
                      name="category"
                      id="category"
                    >
                      <option value="">Category</option>
                      <option value="clothing-and-accessories">
                        Clothing and Accessories
                      </option>
                      <option value="sports">Sports</option>
                      <option value="concerts">Concerts</option>
                      <option value="meet-and-greet">Meet & Greet</option>
                      <option value="e-sports">E-Sports</option>
                      <option value="pop-rock">Pop - Rock</option>
                      <option value="technology">Technology</option>
                      <option value="home-decor">Home - Decor</option>
                      <option value="supply">Supply</option>
                    </select>
                  </div>
                  <div className="mt-6 ">
                    <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[210px] bg-white z-50">
                      ¿Por qué lo recomiendas?
                    </p>
                    <textarea
                      {...register('recomendation', { required: true })}
                      className="w-full -mt-3 border-2 rounded-2xl pl-4 pt-4"
                      name="recomendation"
                      id="recomendation"
                    ></textarea>
                  </div>
                  <div className="mt-6 w-full">
                    <p className="app-subtitle-2 text-app-gray relative ml-7 pl-1 w-[175px] bg-white z-50">
                      Link De Referencia
                    </p>
                    <input
                      {...register('link', { required: true })}
                      type="text"
                      className="relative border-2 block w-full h-14 -mt-3 rounded-2xl z-0 pl-4"
                      name="link"
                      id="link"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full mt-10">
                    <button
                      onClick={handleNext}
                      className="app-subtitle-1 w-32 h-12 bg-app-blue rounded-full text-white"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
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
                      className="flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    >
                      <input onChange={(e) => handleFileChange(0, e)} type="file" id="archivo1" className="hidden" ref={fileInputRef1} />
                      +
                     {
                      imageURLs[0] !== null ? <><p className='text-sm text-center'>Imagen Guardada</p></> : <></>
                     }
                    </label>
                    <label
                      htmlFor="archivo2"
                      className="flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    >
                      <input onChange={(e) => handleFileChange(1, e)} type="file" id="archivo2" className="hidden" ref={fileInputRef2} />
                      +
                      {
                      imageURLs[1] !== null ? <><p className='text-sm text-center'>Imagen Guardada</p></> : <></>
                     }
                    </label>
                    <label
                      htmlFor="archivo3"
                      className="flex flex-col justify-center text-app-blue text-2xl items-center bg-app-grayLight md:w-40 md:h-48 sm:w-32 sm:h-40 w-24 h-28 rounded-2xl cursor-pointer"
                    >
                      <input onChange={(e) => handleFileChange(2, e)} type="file" id="archivo3" className="hidden" ref={fileInputRef3}   />
                      +
                      {
                      imageURLs[2] !== null ? <><p className='text-sm text-center'>Imagen Guardada</p></> : <><p className='hidden'></p></>
                     }
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
        </form>
      </div>
    </div>
  );
};

export default Post;
