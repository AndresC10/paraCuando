import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../../../components/layout/Layout';
import { EventSlider } from '../../../../components/sliders/EventSlider/EventSlider';
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
        <div className='header-shadow w-full h-[114px] flex items-center gap-4'>
        <div className='flex gap-8'>
          <Link href={'/category/brands-and-stores'}>
                <button>Marcas y tiendas</button>
              </Link>
              <Link href={'/category/events'}>
                <button>Artistas y conciertos</button>
              </Link>
              <Link href={'/category/music'}>
                <button>Torneos</button>
              </Link>
        </div>
            <input
            className="px-6 py-4 rounded-3xl w-full sm:w-[465px] border-2"
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
        </div>
      <div className='app-container mt-20 grid grid-cols-8 w-[80%] m-auto mb-20'>
        <div className='col-span-4'>
          <h3 className='app-subtitle-1 mb-1'>Artista / pop - rock</h3> 
          <h2 className='app-title-1 mb-4'>Concierto De Lady Gaga</h2>
          <p className='app-text-1 text-app-grayDark mb-8'>El concierto con la temática de Lady gaga en Las Vegas. El concierto con la temática de Lady gaga en Las Vegas.El concierto con la temática.</p>
          <Link className='text-app-blue app-text-1 text-sm' href={'/category/events'}>
            ladygaga.com
          </Link>

          <div className='flex gap-2 mt-3 ml-2'>
            <p className='app-text-1 text-sm'>LOGO</p>
            <p className='app-text-1 text-sm'>90,800,756 <span>votos</span> </p>
          </div> 
          <button className='mt-4 w-full h-[46px] text-center bg-app-blue rounded-3xl text-white'>
            Votar
          </button>
        </div>
        <div className='ml-4 col-span-4 flex justify-center'>
          <img className='w-full' src="../../../mock-event-image.png" alt="" />
        </div>
      </div>

      <EventSlider title='Recientes' subtitle='Las personas ultimamente estan hablando de esto' events={events}  />
    </div>
  );
};

CategoryPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
}; 

export default CategoryPage;
