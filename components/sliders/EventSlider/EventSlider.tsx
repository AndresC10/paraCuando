import { FC } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import EventCard from './EventCard';
import { useState } from 'react';

interface IEventSlider {
  title?: string;
  subtitle?: string;
  events: CardEvent[];
  onLoadMore?: () => Promise<void>;
}

export const EventSlider: FC<IEventSlider> = ({ title, subtitle, events, onLoadMore }) => {

  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const handleSwiperChange = (swiper: any) => {
    const threshold = 5; // Ajusta este valor según tus necesidades
  
    if (!isLoadingMore && swiper.activeIndex > events.length - threshold && onLoadMore) {
      setIsLoadingMore(true);
      onLoadMore().finally(() => {
        setIsLoadingMore(false);
      });
    }
  };
  


  return (
    <div className="app-container">
      <div className="pb-6">
        <h2 className="app-title-2 pb-1">{title}</h2>
        <p className="app-subtitle-2">{subtitle}</p>
      </div>
      <div className="relative">
        <Swiper
          style={{ position: 'unset' }}
          slidesPerView={'auto'}
          loop={false}
          onSlideChange={handleSwiperChange}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            330: {
              slidesPerView: 1.2,
              spaceBetween: 40,
            },
            600: {
              slidesPerView: 1.8,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
          }}
        >
          {events?.map((event, index) => (
            <SwiperSlide key={index}>
              <EventCard
                key={index}
                imageUrl={event.imageUrl}
                name={event.name}
                description={event.description}
                url={event.url}
                votos={event.votos}
                reference_link={event.reference_link}
                publication_id={event.publication_id}
                same_vote={event.same_vote && event.same_vote[0] ? true : false}
              />
            </SwiperSlide>
          ))}
          <div className="hidden sm:flex items-center absolute top-0 bottom-0 -right-20 left-auto cursor-pointer">
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

// some-inner-component.jsx
import { useSwiper } from 'swiper/react';
import { CardEvent } from '../../../lib/interfaces/cardEvent.interface';

interface ISlideNextButton {
  className?: string;
}
const SlideNextButton = ({ className }: ISlideNextButton) => {
  const swiper = useSwiper();

  return (
    <button className={className} onClick={() => swiper.slideNext()}>
      <BsArrowRightCircle
        className="text-app-blue bg-white rounded-full"
        size={50}
      />
    </button>
  );
};
