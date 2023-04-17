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
      reference_link: 'fdsfasdfasf'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 2',
      description: 'Descripción del evento 2',
      url: 'ladygaga.com',
      votos: 1,
      reference_link: 'fdsfasdfasf'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 3',
      description: 'Descripción del evento 3',
      url: 'ladygaga.com',
      votos: 1,
      reference_link: 'fdsfasdfasf'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 4',
      description: 'Descripción del evento 4',
      url: 'ladygaga.com',
      votos: 1,
      reference_link: 'fdsfasdfasf'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 5',
      description: 'Descripción del evento 5',
      url: 'ladygaga.com',
      votos: 1,
      reference_link: 'fdsfasdfasf'
    },
  ];

  const { data } = useUserMe();

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
          <span className="w-[137px] h-[30px] pt-[6px] bg-[#FFF] border-[1px] border-[#A7A6A7] rounded-[23px] text-[13px] text-[#A7A6A7] leading-[15px] text-center font-medium">
            Mis votos
          </span>
          <span className="w-[137px] h-[30px] pt-[6px] bg-[#FFF] border-[1px] border-[#A7A6A7] rounded-[23px] text-[13px] text-[#A7A6A7] leading-[15px] text-center font-medium">
            Mis publicaciones
          </span>
        </div>
        <div className="w-[100%] max-w-[1480px] flex justify-center flex-wrap gap-[30px] mt-[76px] mr-auto pb-[86px] ml-auto">
          {events.map((event, index) => (
            <EventCard
              key={index}
              imageUrl={event.imageUrl}
              name={event.name}
              description={event.description}
              url={event.url}
              votos={event.votos}
            />
          ))}
        </div>
      </div>
    </>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
