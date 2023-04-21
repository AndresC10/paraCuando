import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../../../../components/assets/svg/User';
import { Layout } from '../../../../components/layout/Layout';
import { EventSlider } from '../../../../components/sliders/EventSlider/EventSlider';
import HamburguerMenu from '../../../../lib/helpers/HamburguerMenu';
import { NextPageWithLayout } from '../../../page';
import { useEffect, useState } from 'react';
import {
  publicationToCardEvent,
  sortPublicationsByDate,
} from '../../../../lib/helpers/Publications.helper';
import {
  usePublications,
  useTags,
} from '../../../../lib/services/publications.services';
import axios from 'axios';
import Cookies from 'js-cookie';
import { alertSuccess } from '../../../../lib/helpers/alert.helper';
import { useUserMe } from '../../../../lib/services/userMe.services';
import SimpleCarousel from '../../../../lib/helpers/SimpleCarousel';
import { PublicationsResponse } from '../../../../lib/interfaces/publications.interface';

export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { details_id } = router.query;
  const [categories, setCategories] = useState<any>([]);
  const token = Cookies.get('token');
  const [publication, setPublication] = useState<any>([]);
  const [userVoted, setUserVoted] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const { data } = useUserMe();


  const tagsArray = publication?.tags?.map((tag: any) => tag.name) || [];

 const images = publication?.images?.map((imageObj: any) => imageObj.image_url) || [];
 const [pageSize, setPageSize] = useState(25);

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


  const { data: publicationResponse, error, isLoading } = usePublications("?size=300");

  const publications = publicationResponse?.results.results;
  const {
    data: tagsResponse,
    error: errorTags,
    isLoading: isLoadingTags,
  } = useTags();
  const tag = tagsResponse?.results.results;

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
    setPublication(
      publications?.find(
        (publication: Publication) => publication.id === details_id
      )
    );
    axios
      .get(
        `https://paracuando-academlo-api.academlo.tech/api/v1/publications-types/`
      )
      .then((response) => {
        setCategories(response.data.results.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [details_id, publications]);

  useEffect(() => {
    axios
      .get(
        `https://paracuando-academlo-api.academlo.tech/api/v1/users/${data?.id}/votes/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const userVotes = response.data.results.results;
        const userVote = userVotes?.find((vote: any) => vote.id === details_id);
        if (userVote) {
          setUserVoted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, token, details_id]);

  const cardEventsSortByDate =
    sortPublicationsByDate(publications || [], pageSize).map(publicationToCardEvent) ||
    [];

  const handleVotar = () => {
    if (!token) {
      router.push('/sign_up');
      return;
    } else {
      const url = `https://paracuando-academlo-api.academlo.tech/api/v1/publications/${publication?.id}/vote/`;
      const method = 'post';

      axios({
        url,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (userVoted) {
            setPublication({
              ...publication,
              votes_count: publication.votes_count - 1,
            });
            alertSuccess('Voto eliminado con éxito');
          } else {
            setPublication({
              ...publication,
              votes_count: publication.votes_count + 1,
            });
            alertSuccess('Voto agregado con éxito');
          }
          setUserVoted(!userVoted);
        })
        .catch((error) => {
          console.log(error);
        });
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="header-shadow w-full h-[114px] flex  items-center gap-4 mb-10 sm:justify-around xs:px-2 sm:px-0">
        <div className="w-60 xs:block sm:hidden">
          <HamburguerMenu />
        </div>
        <div className="relative sm:flex items-center justify-center gap-2 xs:hidden">
          {categories?.map((item: any) => {
            return (
              <Link href={`/category/${item.id}`} key={item.id}>
                <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2 hover:scale-110 transition-all duration-300">
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
            className='md:ml-0 px-6 py-4 rounded-3xl w-[300px] sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
          />
        </form>
      </div>
      <div className="app-container sm:grid grid-cols-8 grid-rows-6 mt-20 w-full max-w-[1000px] h-[450px] mx-4 mb-72 sm:mb-20">
        <div className="sm: col-span-4 row-span-5 sm:grid grid-rows-6">
          <h3 className="app-subtitle-1 mb-1 mt-4">{`${
            publication?.publication_type?.name || ''
          } / ${tagsArray}`}</h3>
          <h2 className="app-title-1 mb-4">{publication?.title}</h2>
          <div className="flex items-center mb-8 row-start-4 row-end-6">
            <p className="app-text-1 text-app-grayDark">
              {publication?.description}
            </p>
          </div>
          <div className='row-start-6 row-end-6'>

          <Link
            className="text-app-blue app-text-1 text-sm mt-4 "
            href={'/category/events'}
          >
            {publication?.reference_link}
          </Link>

          <div className="flex gap-2 mt-2 ml-2 mb-4">
            <User />
            <p className="app-text-2 font-semibold mt-[4.4px]">
              {' '}
              {publication?.votes_count} votos
            </p>
          </div>
          </div>
        </div>
        <div className="sm:ml-4 sm:col-span-4 sm:row-span-6 min-w-[300px] flex justify-center">
          <SimpleCarousel images={images} />
        </div>
        <div className="sm:col-span-4 sm:row-start-6 sm:row-end-6">
          <button
            onClick={handleVotar}
            className=" mt-4 w-full h-[46px] text-center bg-app-blue rounded-3xl text-white hover:bg-blue-400 transition-all duration-300"
          >
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
          {tag?.map((item: any) => (
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

      <EventSlider
        title="Recientes"
        subtitle="Las personas ultimamente estan hablando de esto"
        events={cardEventsSortByDate}
        onLoadMore={loadMoreData}
      />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
