import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../../../../components/assets/svg/User';
import { Layout } from '../../../../components/layout/Layout';
import { EventSlider } from '../../../../components/sliders/EventSlider/EventSlider';
import HamburguerMenu from '../../../../lib/helpers/HamburguerMenu';
import { NextPageWithLayout } from '../../../page';
import { useEffect, useState } from 'react';
import { publicationToCardEvent, sortPublicationsByDate } from '../../../../lib/helpers/Publications.helper';
import { usePublications } from '../../../../lib/services/publications.services';
import axios from 'axios';
import Cookies from 'js-cookie';



export const CategoryPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { details_id } = router.query;
  const [categories, setCategories] = useState<any>([]);
  const token = Cookies.get('token');
  const [publication, setPublication] = useState<any>([]);
  
  const {title, description, reference_link, votes_count, publication_type: { name: publicationName = 'Default' } = {}, images, tags} = publication;
  const firstImage = images?.[0]?.image_url || '';
  const tagsArray = tags?.map((tag: any) => tag.name) || [];
 

  const {data: publicationResponse, error, isLoading} = usePublications();

  const publications = publicationResponse?.results.results

  interface PublicationImage {
    image_url: string;
  }
  
  interface Publication {
    id: string;
    images: PublicationImage[];
    title: string;
    description: string;
    reference_link: string;
    votes_count: number;
    publication_type_id: number;
    created_at: string;
  }

  useEffect(() => {
    setPublication(publications?.find((publication: Publication) => publication.id === details_id))
    axios
    .get(
      `https://paracuando-academlo-api.academlo.tech/api/v1/publications-types/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setCategories(response.data.results.results);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [details_id])

  const cardEventsSortByDate = sortPublicationsByDate(publications || []).map(publicationToCardEvent) || [];

  return (
    <div className='flex flex-col justify-center items-center'>
       <div className='header-shadow w-full h-[114px] flex  items-center gap-4 mb-10 sm:justify-around xs:px-2 sm:px-0'>
            <div className='w-60 xs:block sm:hidden'>
              <HamburguerMenu />
            </div>
        <div className="relative sm:flex items-center justify-center gap-2 xs:hidden">
        {categories?.map((item: any) => {
            return (
              <Link href={`/category/${item.id}`} key={item.id}>
                <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2">
                  {item.name}
                </button>
              </Link>
            );
          })}
          </div>
            <input
            className='xs:ml-20 md:ml-0 px-6 py-4 rounded-3xl w-full sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
        </div>
      <div className='app-container sm:grid grid-cols-8 grid-rows-6 mt-20 w-full max-w-[1000px] h-[450px] mx-4 mb-72 sm:mb-20'>
        <div className='sm: col-span-4 row-span-5 sm:grid grid-rows-6'>
          <h3 className='app-subtitle-1 mb-1 mt-4'>{`${publicationName} / ${tagsArray}`}</h3> 
          <h2 className='app-title-1 mb-4'>{title}</h2>
          <div className='flex items-center mb-8 mt-4 row-start-3 row-end-5'>
          <p className='app-text-1 text-app-grayDark'>{description}</p>
          </div>
          <Link className='text-app-blue app-text-1 text-sm mt-4' href={'/category/events'}>
            {reference_link}
          </Link>

          <div className="flex gap-2 mt-2 ml-2 mb-4">
            <User />
            <p className="app-text-2 font-semibold mt-[4.4px]"> {votes_count} votos</p>
          </div>
        </div>
        <div className='sm:ml-4 sm:col-span-4 sm:row-span-6 min-w-[300px] flex justify-center'>
          <img className='w-full h-96 sm:h-auto' src={firstImage} alt="" />
        </div>
        <div className='sm:col-span-4 sm:row-start-6 sm:row-end-6'>
        <button className=' mt-4 w-full h-[46px] text-center bg-app-blue rounded-3xl text-white'>
            Votar
          </button>
        </div>
      </div>

      <div className="relative  h-[250px] w-[941px] mx-auto mb-20 bg-[#f8f7fa]">
        <h2 className="relative ml-12 top-6 app-title-2 text-app-grayDark">
          ¡Hagámoslo más personal!
        </h2>
        <p className="relative ml-12 top-8 app-subtitle-2 text-app-grayDark">
          Selecciona tus interes para brindarte sugerencia de acuerdo a tus
          gustos
        </p>
        <div className="flex gap-2 mt-12 md:w-[941px] xs:w-[460px]">
          <button className="relative top-10 left-7 bg-white min-w-[150px] py-4 text-app-gray rounded-full app-text-2 leading-[15.23px] border-[3px]">
            Marcas y tiendas
          </button>
          <button className="relative top-10 left-7 bg-white min-w-[150px]  py-4 text-app-gray rounded-full app-text-2 leading-[15.23px] border-[3px]">
            Artistas y conciertos
          </button>
          <button className="relative top-10 left-7 bg-white min-w-[150px]  py-4 text-app-gray rounded-full app-text-2 leading-[15.23px] border-[3px]">
            Torneos
          </button>
          <button className="relative top-10 left-7 bg-white min-w-[150px]  py-4 text-app-gray rounded-full app-text-2 leading-[15.23px] border-[3px]">
            Restaurantes
          </button>
          <button className="relative top-10 left-7 bg-white min-w-[150px]  py-4 text-app-gray rounded-full app-text-2 leading-[15.23px] border-[3px]">
            Rock
          </button>
        </div>
        <Link href={'todoslosinteres'}>
          <p className="relative ml-8 top-16 app-subtitle-1 text-[#1b4db1] pb-4">
            Ver todos los intereses
          </p>
        </Link>
      </div>

      <EventSlider title='Recientes' subtitle='Las personas ultimamente estan hablando de esto' events={cardEventsSortByDate}  />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
}; 

export default CategoryPage;
