import { useState } from 'react';
import useSWR from 'swr';
import { Layout } from '../../components/layout/Layout';
import EventCard from '../../components/sliders/EventSlider/EventCard';
import { CardEvent } from '../../lib/interfaces/cardEvent.interface';
import { useUserMe } from '../../lib/services/userMe.services';
import { NextPageWithLayout } from '../page';
export const CategoryPage: NextPageWithLayout = () => {
  const events: CardEvent[] = [
    {
      imageUrl: '/mock-event-image.png',
      name: 'Concierto de Lady Gaga',
      description:
        ' El concierto con la temática de Lady gaga en Las Vegas. El concierto con la temática de Lady gaga en Las Vegas.El concierto con la temática.',
      url: './category/1/details/1',
      votos: 1,
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 2',
      description: 'Descripción del evento 2',
      url: 'ladygaga.com',
      votos: 1,
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 3',
      description: 'Descripción del evento 3',
      url: 'ladygaga.com',
      votos: 1,
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 4',
      description: 'Descripción del evento 4',
      url: 'ladygaga.com',
      votos: 1,
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 5',
      description: 'Descripción del evento 5',
      url: 'ladygaga.com',
      votos: 1,
    },
  ];

  const [page, setPage] = useState(1);
  const [infoTag, setInfoTag] = useState('/votes');
  const { data } = useUserMe();
  const { data: userData } = useSWR(() =>
    data && page ? '/users/' + data.id + infoTag + '?page=' + page : null
  );

  console.log(userData);

  const arrPages = [];
  for (let i = 1; i <= userData?.results.totalPages; i++) {
    arrPages.push(i);
  }

  const votesHandler = () => {
    setInfoTag('/votes');
  };

  const publicationHandler = () => {
    setInfoTag('/publications');
  };

  const handleClick = (e: any) => {
    setPage(e.target.innerText);
  };
  return (
    <>
      <div className="w-[100%] h-[129px] bg-[#1B4DB1] flex justify-center">
        <div
          className={`w-[117px] h-[117px] rounded-full translate-y-[70.5px] `}
          style={
            data
              ? { backgroundImage: `url(${data?.image_url})` }
              : { backgroundColor: 'white' }
          }
        ></div>
      </div>
      <div className="bg-[#ECE6E6] pt-[82px]">
        <div className="w-[100%] flex justify-center gap-3">
          <div
            className="w-[137px] h-[30px] pt-[6px] bg-[#FFF] border-[1px] border-[#A7A6A7] rounded-[23px] text-[13px] text-[#A7A6A7] leading-[15px] text-center font-medium"
            onClick={votesHandler}
          >
            Mis votos
          </div>
          <div
            className="w-[137px] h-[30px] pt-[6px] bg-[#FFF] border-[1px] border-[#A7A6A7] rounded-[23px] text-[13px] text-[#A7A6A7] leading-[15px] text-center font-medium"
            onClick={publicationHandler}
          >
            Mis publicaciones
          </div>
        </div>
        <div className="w-[100%] max-w-[1480px] flex justify-center flex-wrap gap-[30px] mt-[76px] mr-auto pb-[86px] ml-auto">
          {userData?.results.results.map((event: any, index: number) => (
            <EventCard
              key={index}
              imageUrl={event.images[0]?.image_url}
              name={event.title}
              description={event.description}
              url={event.reference_link}
              votos={event.votes_count}
            />
          ))}
        </div>
      </div>
      {arrPages && (
        <div className="w-[100%] bg-[#ECE6E6] flex justify-center">
          <ul className="flex gap-3 xxs:gap-6 sm:gap-8 md:gap-10 mb-14">
            {page > 4
              ? arrPages?.slice(page - 4, +page + 3).map((e) => (
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
                    className={`w-8 h-8 text-[16px] text-[#988989] text-center flex items-center justify-center cursor-pointer ${
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
      )}
    </>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
