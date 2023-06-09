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
import {
  usePublications,
  useTags,
} from '../../../lib/services/publications.services';
import { usePublicationsTypes } from '../../../lib/services/publications-types.services';
import { useState } from 'react';
import Loader from '../../../lib/helpers/Loader';
import { PublicationsResponse } from '../../../lib/interfaces/publications.interface';
import axios from 'axios';

export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { category_id } = router.query;

  const { data: publicationResponse, error, isLoading } = usePublications("?size=300");
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

  if(isLoading || isLoadingPublicationsTypes || isLoadingTags) {
    return <Loader />;
  }

  const publications = publicationResponse?.results.results;
  const publicationsTypes = publicationsTypesResponse?.results.results;
  const tags = tagsResponse?.results.results;

  interface PublicationType {
    id?: number;
    name?: string;
  }

  const loadMoreData = async () => {
    // Incrementar el tamaño de la página actual
    setPageSize(pageSize + 25);
  
    // Obtener datos adicionales
    try {
      const response = await axios.get<PublicationsResponse>(`/publications?size=${pageSize + 25}`);
  
      if (publicationResponse) {
        // Concatenar los datos nuevos con los datos existentes
        const updatedData = [...publicationResponse.results.results, ...response.data.results.results];
  
        // Actualizar el estado de las publicaciones
        publicationResponse.results.results = updatedData;
      }
  
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      router.push(`/search?query=${searchValue}`);
    }
  };

  const publicationsTypesById: PublicationType =
    publicationsTypes?.find(
      (publicationType: any) => publicationType.id == category_id
    ) ?? {};


  // Desestructura id y name de publicationsTypesById
  const { id, name } = publicationsTypesById;

  const filteredPublications =
    id !== undefined
      ? filterPublicationsByCategory(publications || [], id)
      : [];

  const cardSortedByVotes =
    sortPublicationsByVotes(filteredPublications, pageSize).map(publicationToCardEvent) ||
    [];
  const cardSortedByDate =
    sortPublicationsByDate(filteredPublications, pageSize).map(publicationToCardEvent) ||
    [];
  const cardSortedBySuggestion =
    sortPublicationsBySuggestion(filteredPublications, pageSize).map(
      publicationToCardEvent
    ) || [];

  return (
    <div>
      <div className='w-full h-52 bg-[url("/branch-and-stories.png")] bg-cover bg-center'>
        <h3 className="relative xs:top-4 xs:ml-16 md:top-8 md:ml-32 app-subtitle-1 text-white">
          Home / {name}
        </h3>
        <h2 className="relative xs:top-5 xs:ml-16 md:top-10 md:ml-32 app-title-1 text-app-yellow">
          {name}
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
          {publicationsTypes?.map((item: any) => {
            return (
              <Link href={`/category/${item.id}`} key={item?.id}>
                <button
                  onClick={() => setSelectedItem(item?.id)}
                  className={`bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2 hover:scale-110 transition-all duration-300 ${
                    selectedItem === item?.id
                      ? 'border-2 border-app-yellow'
                      : ''
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchValue"
            placeholder="¿Qué quieres ver en tu ciudad?"
            onChange={handleChange}
            className='xs:ml-0 md:ml-0 px-6 py-4 rounded-3xl w-[300px] sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
          />
        </form>
      </div>

      <EventSlider
        title="Populares en Queretaro"
        subtitle="Lo que las personas piden mas"
        events={cardSortedByVotes}
        onLoadMore={loadMoreData}
      />
      <EventSlider
        title="Sugerencias para ti"
        subtitle="Publicaciones que podrian colaborar"
        events={cardSortedBySuggestion}
        onLoadMore={loadMoreData}
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
          {tags?.map((item: any) => (
            <button
              key={item.id}
              className={`bg-white w-40 h-14 mx-2 text-app-gray rounded-full app-text-2 leading-[15.23px] hover:scale-110 transition-transform duration-300`}
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
      <EventSlider
        title="Recientes"
        subtitle="Las personas ultimamente estan hablando de esto"
        events={cardSortedByDate}
        onLoadMore={loadMoreData}
      />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
