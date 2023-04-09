import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../../../../components/assets/svg/User';
import { Layout } from '../../../../components/layout/Layout';
import { EventSlider } from '../../../../components/sliders/EventSlider/EventSlider';
import HamburguerMenu from '../../../../lib/helpers/HamburguerMenu';
import { CardEvent } from '../../../../lib/interfaces/cardEvent.interface';
import { NextPageWithLayout } from '../../../page';
export const CategoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { details_id } = router.query;

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
    <div className=''>
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
      <div className='app-container sm:grid grid-cols-12 mt-20 w-[80%] h-[500px] m-auto mb-20'>
        <div className='sm: col-span-4'>
          <h3 className='app-subtitle-1 mb-1'>Artista / pop - rock</h3> 
          <h2 className='app-title-1 mb-4'>Concierto De Lady Gaga</h2>
          <p className='app-text-1 text-app-grayDark mb-8'>El concierto con la temática de Lady gaga en Las Vegas. El concierto con la temática de Lady gaga en Las Vegas.El concierto con la temática.</p>
          <Link className='text-app-blue app-text-1 text-sm' href={'/category/events'}>
            ladygaga.com
          </Link>

          <div className="flex gap-2 mt-2">
            <User />
            <p className="app-text-2 font-semibold mt-[4.4px]"> 999,789,000 votos</p>
          </div>
          <button className=' mt-4 w-full h-[46px] text-center bg-app-blue rounded-3xl text-white'>
            Votar
          </button>
        </div>
        <div className='sm:ml-4 sm:col-span-4 flex justify-center'>
          <img className='w-full' src="../../../mock-event-image.png" alt="" />
        </div>

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
        <Link href={'todoslosinteres'}>
          <p className="relative ml-8 top-16 app-subtitle-1 text-[#1b4db1] pb-4">
            Ver todos los intereses
          </p>
        </Link>
      </div>

      <EventSlider title='Recientes' subtitle='Las personas ultimamente estan hablando de esto' events={events}  />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
}; 

export default CategoryPage;
