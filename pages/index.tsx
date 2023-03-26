import Link from 'next/link';
import Logo from '../components/assets/logo/Logo';
import { Layout } from '../components/layout/Layout';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import { useCategories } from '../lib/services/categories.services';
import { NextPageWithLayout } from './page';
import { CardEvent } from '../lib/interfaces/cardEvent.interface';

const Home: NextPageWithLayout = () => {
  const { data, error, isLoading } = useCategories();

  console.log({ data, error, isLoading });

  const events: CardEvent[] = [
    {
      imageUrl: './mock-event-image.png',
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
      {/* HERO SECTION */}
      <div className='min-h-[488px] flex justify-center items-center flex-col bg-[url("/hero-banner.png")] bg-cover bg-center app-banner -mt-4 gap-5'>
        <div>
          <Logo />
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="px-6 py-4 rounded-3xl w-full sm:w-[465px]"
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
          <div className="flex items-center justify-center gap-2">
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
        </div>
      </div>
      {/* CONTENIDO */}
      <div className="h-[72vh] mt-8">
        <EventSlider
          title="Populares en Querétaro"
          subtitle="Lo que las personas piden más"
          events={events}
        />
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
