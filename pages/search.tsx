import { Layout } from '../components/layout/Layout';
import { NextPageWithLayout } from './page';
import { usePublicationsTypes } from '../lib/services/publications-types.services';
import { useEffect, useState } from 'react';
import SearchCard from '../components/sliders/EventSlider/SearchCard';
import { usePublications } from '../lib/services/publications.services';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import { filterPublicationsByCategory, publicationToCardEvent, sortPublicationsByDate, sortPublicationsByVotes } from '../lib/helpers/Publications.helper';

const Search: NextPageWithLayout = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [searchValue, setSearchValue] = useState('');

 
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchValues = urlParams.get('query');
    if(!urlParams) {
      return;
    }
    else {
      setSearchValue(searchValues || '');
    }
  }, []);
  

  const handleSelect = (id: string) => {
    setSelectedItem(id);

  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  }

  const {
    data: publicationsTypesResponse,
    error: errorPublicationsTypes,
    isLoading: isLoadingPublicationsTypes,
  } = usePublicationsTypes();

  const { data, error, isLoading } = usePublications();

  const publicationsTypes = publicationsTypesResponse?.results.results;
  const publications = data?.results.results;


  const filterPublicationsByName = (publications: any, searchValue: string) => {
    if(!searchValue) return publications;
    return publications.filter((publication: any) => publication?.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

  const cardEventsSortByDate =
  sortPublicationsByDate(publications || []).map(publicationToCardEvent) ||
  [];

  const cardEventsSortByVotes = sortPublicationsByVotes(
    filterPublicationsByName(publications || [], searchValue)
  ).map(publicationToCardEvent) || [];

  const sortByCategory = filterPublicationsByCategory(
    filterPublicationsByName(publications || [], searchValue),
    selectedItem
  ).map(publicationToCardEvent) || [];
  
  return (
    <div>
      <div className='w-full h-36 bg-[url("/imgSearch.png")] bg-cover bg-center'>
        <h3 className="relative pt-16 xs:top-4 xs:ml-16 md:top-8 md:ml-32 app-subtitle-1 font-medium text-white">
          Home / Search
        </h3>
      </div>
      <div className="header-shadow w-full h-[114px] flex flex-col justify-center  items-center gap-4 mb-10  xs:px-2 sm:px-0">
        <form
          className="relative mt-4  flex justify-center items-center gap-4"
          action=""
        >
          <input
            className='xs:ml-20 md:ml-0 px-6 py-4 rounded-3xl w-full sm:w-[561px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
            value={searchValue}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="app-subtitle-1 w-32 h-12 bg-app-blue rounded-full text-white"
          >
            Search
          </button>
        </form>
        <div className="relative w-[700px] sm:flex justify-between gap-2 xs:hidden">
          <p
            className={`relative pb-2 app-subtitle-2 text-app-grayDark ${
              selectedItem === '' ? 'selected' : ''
            }`}
            onClick={() => handleSelect('')}
          >
            Todos los resultados
          </p>
          {publicationsTypes?.map((item: any) => {
            return (
              <p
                className={`relative pb-2 app-subtitle-2 text-app-grayDark ${
                  selectedItem === item.id ? 'selected' : ''
                }`}
                key={item.id}
                onClick={() => handleSelect(item.id)}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className=" flex flex-col gap-2 h-[72vh] w-[80%] mx-auto mt-8 mb-[430px]">
        {
         selectedItem === '' ?  cardEventsSortByVotes?.slice(0,4).map((item: any) => {
          return (
            <SearchCard
              key={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              description={item.description}
              url={item.url}
              votos={item.votos}
            />
          );
      }) : 
      sortByCategory?.slice(0,4).map((item: any) => {
        return (
          <SearchCard
            key={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            description={item.description}
            url={item.url}
            votos={item.votos}
          />
        );
    })
        }
       
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

Search.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Search;
