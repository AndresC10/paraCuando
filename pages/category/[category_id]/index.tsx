import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/layout/Layout';
import { EventSlider } from '../../../components/sliders/EventSlider/EventSlider';
import HamburguerMenu from '../../../lib/helpers/HamburguerMenu';
import { NextPageWithLayout } from '../../page';
import {
  publicationToCardEvent,
  sortPublicationsByVotes,
  sortPublicationsByDate,
  sortPublicationsBySuggestion,
  filterPublicationsByCategory,
} from '../../../lib/helpers/Publications.helper';
import { usePublications } from '../../../lib/services/publications.services';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { category_id } = router.query;
  const [category, setCategory] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  const { data: publicationResponse, error, isLoading } = usePublications();

  const publications = publicationResponse?.results.results;
  const token = Cookies.get('token');

  const filteredPublications = filterPublicationsByCategory(
    publications || [],
    category.id
  );
  const cardSortedByVotes =
    sortPublicationsByVotes(filteredPublications).map(publicationToCardEvent) ||
    [];
  const cardSortedByDate =
    sortPublicationsByDate(filteredPublications).map(publicationToCardEvent) ||
    [];
  const cardSortedBySuggestion =
    sortPublicationsBySuggestion(filteredPublications).map(
      publicationToCardEvent
    ) || [];

  useEffect(() => {
    // Peticion 1: Tipo de publicación por ID
    const fetchCategoryById = () =>
      axios.get(
        `https://paracuando-academlo-api.academlo.tech/api/v1/publications-types/${category_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    // Peticion 2: Todos los tipos de publicación
    const fetchAllCategories = () =>
      axios.get(
        'https://paracuando-academlo-api.academlo.tech/api/v1/publications-types',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    // Realizar ambas peticiones y actualizar el estado cuando se completen
    Promise.all([fetchCategoryById(), fetchAllCategories()])
      .then(([categoryByIdResponse, allCategoriesResponse]) => {
        // Actualizar el estado según las respuestas
        setCategory(categoryByIdResponse.data.results);
        setCategories(allCategoriesResponse.data.results.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category_id]);

  console.log(category)

  return (
    <div>
      <div className='w-full h-52 bg-[url("/branch-and-stories.png")] bg-cover bg-center'>
        <h3 className="relative xs:top-4 xs:ml-16 md:top-8 md:ml-32 app-subtitle-1 text-white">
          Home / {category.name}
        </h3>
        <h2 className="relative xs:top-5 xs:ml-16 md:top-10 md:ml-32 app-title-1 text-app-yellow">
          {category.name}
        </h2>
        <p className="relative xs:top-5 xs:ml-16 md:top-10 md:ml-32 text-white app-subtitle-1">
          Descubre las marcas y tiendas que la gente quiere cerca
        </p>
      </div>
      <div className="header-shadow w-full h-[114px] flex  items-center gap-4 mb-10 sm:justify-around xs:px-2 sm:px-0">
        <div className="w-60 xs:block sm:hidden">
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

      <EventSlider
        title="Populares en Queretaro"
        subtitle="Lo que las personas piden mas"
        events={cardSortedByVotes}
      />
      <EventSlider
        title="Sugerencias para ti"
        subtitle="Publicaciones que podrian colaborar"
        events={cardSortedBySuggestion}
      />
      <div className="relative  h-[250px] w-[941px] mx-auto mt-20 mb-20 bg-[#f8f7fa]">
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
      <EventSlider
        title="Recientes"
        subtitle="Las personas ultimamente estan hablando de esto"
        events={cardSortedByDate}
      />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
