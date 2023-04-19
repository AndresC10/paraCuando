import { useEffect, useState } from 'react';
import { Carbon } from '../components/assets/svg/Carbon';
import { Layout } from '../components/layout/Layout';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import SearchCard from '../components/sliders/EventSlider/SearchCard';
import {
  filterPublicationsByCategory,
  publicationToCardEvent,
  sortPublicationsByDate,
  sortPublicationsByVotes,
} from '../lib/helpers/Publications.helper';
import useWindowSize from '../lib/helpers/useWindowSize';
import { usePublicationsTypes } from '../lib/services/publications-types.services';
import { usePublications } from '../lib/services/publications.services';
import { NextPageWithLayout } from './page';
import { PublicationsResponse } from '../lib/interfaces/publications.interface';
import axios from 'axios';

const Search: NextPageWithLayout = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [publicationsType, setPublicationsType] = useState<any>([]);
  const windowSize = useWindowSize();
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    setPublicationsType(
      publicationsTypes?.map((publicationType: any) => publicationType.name)
    );
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchValues = urlParams.get('query');
    if (!urlParams) {
      return;
    } else {
      setSearchValue(searchValues || '');
    }
  }, []);

  const shouldRenderItem = (index: any) => {
    const minWidth = 600;
    return (windowSize.width && windowSize.width >= minWidth) || index === 0;
  };

  const handleSelect = (id: string) => {
    setSelectedItem(id);
  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handlePlus = () => {
    const carbon = document.getElementById('carbonPlus');
    if (carbon) {
      const existingDiv = carbon.querySelector('.divCarbon');

      if (existingDiv) {
        carbon.removeChild(existingDiv);
      } else {
        const newDiv = document.createElement('div');
        newDiv.classList.add('divCarbon');
        carbon.appendChild(newDiv);
        publicationsTypes?.slice(1, 3).map((item: any) => {
          const newP = document.createElement('p');
          newP.classList.add('pCarbon');
          newP.innerHTML = item.name;

          newP.addEventListener('click', () => {
            handleSelect(item.id);
          });

          newDiv.appendChild(newP);
        });
      }
    }
  };

  const {
    data: publicationsTypesResponse,
    error: errorPublicationsTypes,
    isLoading: isLoadingPublicationsTypes,
  } = usePublicationsTypes();

  const [page, setPage] = useState(1);
  const { data: publicationResponse, error, isLoading } = usePublications('?size=300');

  const publicationsTypes = publicationsTypesResponse?.results.results;
  const publications = publicationResponse?.results.results;

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

  const filterPublicationsByName = (publications: any, searchValue: string) => {
    if (!searchValue) return publications;
    return publications.filter((publication: any) =>
      publication?.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const cardEventsSortByDate =
    sortPublicationsByDate(publications || [], pageSize).map(publicationToCardEvent) ||
    [];

  const cardEventsSortByVotes =
    sortPublicationsByVotes(
      filterPublicationsByName(publications || [], searchValue), pageSize
    ).map(publicationToCardEvent) || [];

  const sortByCategory =
    filterPublicationsByCategory(
      filterPublicationsByName(publications || [], searchValue),
      selectedItem
    ).map(publicationToCardEvent) || [];

  console.log(cardEventsSortByVotes);

  const arrPages = [];
  if (selectedItem === '') {
    for (let index = 1; index < cardEventsSortByVotes.length; index++) {
      arrPages.push(index);
    }
  } else {
    for (let index = 1; index < cardEventsSortByVotes.length; index++) {
      arrPages.push(index);
    }
  }
  const handleClick = (e: any) => {
    setPage(e.target.innerText);
  };

  console.log(page);
  console.log(arrPages.slice(+page - 3, +page + 4));
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
            className='md:ml-0 px-6 py-3 rounded-3xl w-[350px] sm:w-[615px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
            value={searchValue}
            onChange={handleSearch}
          />
        </form>
        <div className="mt-1 relative xxs:w-[350px] sm:w-[650px] flex gap-6 sm:justify-between">
          <p
            className={`cursor-pointer hover:scale-110 transition-transform duration-300 relative xs:text-sm pb-2 sm:app-subtitle-2 text-app-grayDark ${
              selectedItem === '' ? 'selected' : ''
            }`}
            onClick={() => handleSelect('')}
          >
            Todos los resultados
          </p>
          {publicationsTypes?.map((item: any, index) => {
            if (shouldRenderItem(index)) {
              return (
                <p
                  className={`cursor-pointer hover:scale-110 transition-transform duration-300 relative xs:text-sm pb-2 sm:app-subtitle-2 text-app-grayDark ${
                    selectedItem === item.id ? 'selected' : ''
                  }`}
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.name}
                </p>
              );
            }
            return null;
          })}
          <div
            id="carbonPlus"
            onClick={handlePlus}
            className="cursor-pointer relative top-[5px] sm:hidden"
          >
            <Carbon />
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-2  w-[80%] mx-auto mt-8 mb-[60px]">
        {selectedItem === ''
          ? cardEventsSortByVotes
              ?.slice((+page - 1) * 10, +page * 10)
              .map((item: any) => {
                return (
                  <SearchCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    description={item.description}
                    url={item.url}
                    votos={item.votos}
                    reference_link={item.reference_link}
                    publication_id={item.publication_id}
                    same_vote={
                      item.same_vote && item.same_vote[0] ? true : false
                    }
                  />
                );
              })
          : sortByCategory
              ?.slice((+page - 1) * 10, +page * 10)
              .map((item: any) => {
                return (
                  <SearchCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    description={item.description}
                    url={item.url}
                    votos={item.votos}
                    reference_link={item.reference_link}
                    publication_id={item.publication_id}
                    same_vote={
                      item.same_vote && item.same_vote[0] ? true : false
                    }
                  />
                );
              })}
      </div>
      <div className="w-[100%]  flex justify-center">
        <ul className="flex gap-3 xxs:gap-6 sm:gap-8 md:gap-10 mb-14">
          {page > 4
            ? arrPages?.slice(+page - 4, +page + 3).map((e) => (
                <li
                  className={`w-8 h-8 text-[16px] text-[#988989] flex items-center justify-center cursor-pointer ${
                    page == e && 'active-page'
                  }`}
                  onClick={handleClick}
                  key={e}
                >
                  {e}
                </li>
              ))
            : arrPages?.slice(0, 7).map((e) => (
                <li
                  className={`w-8 h-8 text-[16px] text-[#988989] flex items-center justify-center cursor-pointer ${
                    page == e && 'active-page'
                  }`}
                  onClick={handleClick}
                  key={e}
                >
                  {e}
                </li>
              ))}
        </ul>
      </div>
      <div className="h-[72vh] mt-8">
        <EventSlider
          title="Recientes"
          subtitle="Las personas últimanete están hablando de esto"
          events={cardEventsSortByDate}
          onLoadMore={loadMoreData}
        />
      </div>
    </div>
  );
};

Search.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Search;
