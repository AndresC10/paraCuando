import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Logo from '../components/assets/logo/Logo';
import { Layout } from '../components/layout/Layout';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import Loader from '../lib/helpers/Loader';
import {
  publicationToCardEvent,
  sortPublicationsByDate,
  sortPublicationsBySuggestion,
  sortPublicationsByVotes,
} from '../lib/helpers/Publications.helper';
import { usePublicationsTypes } from '../lib/services/publications-types.services';
import {
  usePublications,
  useTags,
} from '../lib/services/publications.services';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      router.push(`/search?query=${searchValue}`);
    }
  };

  const { data: publicationResponse, isLoading } = usePublications('?size=300');
  const {
    data: publicationsTypesResponse,
    isLoading: isLoadingPublicationsTypes,
  } = usePublicationsTypes();
  const { data: tagsResponse, isLoading: isLoadingTags } = useTags();

  const publications = publicationResponse?.results.results;
  const publicationsTypes = publicationsTypesResponse?.results.results;
  const tags = tagsResponse?.results.results;

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

  if (isLoading || isLoadingPublicationsTypes || isLoadingTags) {
    return <Loader />;
  }

  console.log(cardEventsSort);
  return (
    <div>
      {/* HERO SECTION */}
      <div className='min-h-[488px] flex justify-center items-center flex-col bg-[url("/hero-banner.png")] bg-cover bg-center app-banner gap-5'>
        <div>
          <Logo />
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchValue"
              placeholder="¿Qué quieres ver en tu ciudad?"
              onChange={handleChange}
              className='md:ml-0 px-6 py-4 rounded-3xl w-full sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            />
          </form>
          <div className="relative flex items-center justify-center gap-2">
            {publicationsTypes?.map((item: any) => {
              return (
                <Link href={`/category/${item.id}`} key={item.id}>
                  <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] hover:scale-110 transition-all duration-300">
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
          {tags?.map((item: any) => (
            <button
              key={item.id}
              className="bg-white w-40 h-14 mx-2 text-app-gray rounded-full app-text-2 leading-[15.23px] hover:scale-110 transition-transform duration-300"
            >
              {item.name}
            </button>
          ))}
        </div>
        <Link href={`/category/${1}`}>
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
