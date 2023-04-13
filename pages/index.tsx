import Link from 'next/link';
import Logo from '../components/assets/logo/Logo';
import { Layout } from '../components/layout/Layout';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import { NextPageWithLayout } from './page';
import { usePublications } from '../lib/services/publications.services';
import {
  publicationToCardEvent,
  sortPublicationsByDate,
  sortPublicationsBySuggestion,
  sortPublicationsByVotes,
} from '../lib/helpers/Publications.helper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Home: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<any>([]);
  const token = Cookies.get('token');

  useEffect(() => {
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
  }, []);

  console.log(categories);

  const { data: publicationResponse, error, isLoading } = usePublications();

  const publications = publicationResponse?.results.results;

  const cardEventsSort =
    sortPublicationsByVotes(publications || []).map(publicationToCardEvent) ||
    [];
  const cardEventsSortByDate =
    sortPublicationsByDate(publications || []).map(publicationToCardEvent) ||
    [];
  const cardEventsSortBySuggestion =
    sortPublicationsBySuggestion(publications || []).map(
      publicationToCardEvent
    ) || [];

  return (
    <div>
      {/* HERO SECTION */}
      <div className='min-h-[488px] flex justify-center items-center flex-col bg-[url("/hero-banner.png")] bg-cover bg-center app-banner gap-5'>
        <div>
          <Logo />
        </div>
        <div className="flex flex-col gap-4">
          <input
            className='px-6 py-4 rounded-3xl w-full sm:w-[465px]  bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
          <div className="relative flex items-center justify-center gap-2">
            {categories?.map((item: any) => {
              return (
                <Link href={`/category/${item.id}`} key={item.id}>
                  <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px]">
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-[72vh] mt-8">
        <EventSlider
          title="Populares en Querétaro"
          subtitle="Lo que las personas piden más"
          events={cardEventsSort}
        />
      </div>

      <div className="h-[72vh] mt-8">
        <EventSlider
          title="Sugerencias para ti"
          subtitle="Publicaciones que podrías colaborar"
          events={cardEventsSortBySuggestion}
        />
      </div>

      <div className="relative  h-[250px] w-[941px] mx-auto bg-[#f8f7fa]">
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
        <Link href={'todoslosintereses'}>
          <p className="relative ml-8 top-16 app-subtitle-1 text-[#1b4db1] pb-4">
            Ver todos los intereses
          </p>
        </Link>
      </div>

      <div className="h-[72vh] mt-8">
        <EventSlider
          title="Recientes"
          subtitle="Las personas últimanete están hablando de esto"
          events={cardEventsSortByDate}
        />
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
