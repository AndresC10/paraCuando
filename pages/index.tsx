import Link from 'next/link';
import Logo from '../components/assets/logo/Logo';
import { Layout } from '../components/layout/Layout';
import { EventSlider } from '../components/sliders/EventSlider/EventSlider';
import { useCategories } from '../lib/services/categories.services';
import { NextPageWithLayout } from './page';
import { CardEvent } from '../lib/interfaces/cardEvent.interface';
import { usePublications } from '../lib/services/publications.services'; 

const Home: NextPageWithLayout = () => {

  const {data: publicationResponse, error, isLoading} = usePublications();

  const publications = publicationResponse?.results?.results

  const img = publicationResponse?.results?.results[2].images[0].image_url


  // const publicationToCardEvent = (publication) =>({
  //   imageUrl: img,
  //   name: publication.title,
  //   description: publication.description,
  //   url: publication.reference_link,
  //   votos: publication.votes_count
  // })

  // const cardEvents = publications?.map(publicationToCardEvent) || [];

  return (
    <div>
      {/* HERO SECTION */}
      <div className='min-h-[488px] flex justify-center items-center flex-col bg-[url("/hero-banner.png")] bg-cover bg-center app-banner gap-5'>
        <div>
          <Logo />
        </div>
        <div className="flex flex-col gap-4">
          <input
            className='px-6 py-4 rounded-3xl w-full sm:w-[465px]  bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
            type="text"
            placeholder="¿Qué quieres ver en tu ciudad?"
          />
          <div className="relative flex items-center justify-center gap-2">
            <Link href={'/category/brands-and-stores'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px]">
                Marcas y tiendas
              </button>
            </Link>
            <Link href={'/category/events'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px]">
                Artistas y conciertos
              </button>
            </Link>
            <Link href={'/category/music'}>
              <button className="bg-white px-3 py-2 text-app-gray rounded-full app-text-2 leading-[15.23px]">
                Torneos
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* CONTENIDO */}
      {
       
           
        
      }
      {/* <div className="h-[72vh] mt-8">
        <EventSlider
          title="Sugerencias para ti"
          subtitle="Publicaciones que podrías colaborar"
          events={cardEvents}
        />
      </div> */}

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

      {/* <div className="h-[72vh] mt-8">
        <EventSlider
          title="Recientes"
          subtitle="Las personas últimanete están hablando de esto"
          events={cardEvents}
        />
      </div> */}
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
