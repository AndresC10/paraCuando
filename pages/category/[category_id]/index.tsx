import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/layout/Layout';
import { EventSlider } from '../../../components/sliders/EventSlider/EventSlider';
import HamburguerMenu from '../../../lib/helpers/HamburguerMenu';
import { CardEvent } from '../../../lib/interfaces/cardEvent.interface';
import { NextPageWithLayout } from '../../page';
export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { category_id } = router.query;
  
  const events: CardEvent[] = [
    {
      imageUrl: '../../../mock-event-image.png',
      name: 'Concierto de Lady Gaga',
      description:
        ' El concierto con la temática de Lady gaga en Las Vegas. El concierto con la temática de Lady gaga en Las Vegas.El concierto con la temática.',
      url: './category/1/details/1',
      votos: '90,800,756',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 2',
      description: 'Descripción del evento 2',
      url: 'ladygaga.com',
      votos: '90,800,756',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 3',
      description: 'Descripción del evento 3',
      url: 'ladygaga.com',
      votos: '90,800,756',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 4',
      description: 'Descripción del evento 4',
      url: 'ladygaga.com',
      votos: '90,800,756',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Evento 5',
      description: 'Descripción del evento 5',
      url: 'ladygaga.com',
      votos: '90,800,756',
    },
  ];
  return (
    <div>
        <div className='w-full h-52 bg-[url("/branch-and-stories.png")] bg-cover bg-center'>
          <h3 className='relative xs:top-4 xs:ml-16 md:top-8 md:ml-32 app-subtitle-1 text-white'>
            Home / {category_id}
          </h3>
          <h2 className='relative xs:top-5 xs:ml-16 md:top-10 md:ml-32 app-title-1 text-app-yellow'>{category_id}</h2>
          <p className='relative xs:top-5 xs:ml-16 md:top-10 md:ml-32 text-white app-subtitle-1'>Descubre las marcas y tiendas que la gente quiere cerca</p>
        </div>
        <div className='header-shadow w-full h-[114px] flex  items-center gap-4 mb-10 sm:justify-around xs:px-2 sm:px-0'>
            <div className='w-60 xs:block sm:hidden'>
              <HamburguerMenu />
            </div>
        <div className="relative sm:flex items-center justify-center gap-2 xs:hidden">
            <Link href={'/category/brands-and-stores'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2">
                Marcas y tiendas
              </button>
            </Link>
            <Link href={'/category/events'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2">
                Artistas y conciertos
              </button>
            </Link>
            <Link href={'/category/music'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px] border-2">
                Torneos
              </button>
            </Link>
          </div>
            <input
            className='xs:ml-20 md:ml-0 px-6 py-4 rounded-3xl w-full sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
        </div>

        <EventSlider title='Populares en Queretaro' subtitle='Lo que las personas piden mas' events={events}/>
        <EventSlider title='Sugerencias para ti' subtitle='Publicaciones que podrian colaborar' events={events}/>
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
      <EventSlider title='Recientes' subtitle='Las personas ultimamente estan hablando de esto' events={events} />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
