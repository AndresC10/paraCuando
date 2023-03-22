import { FC, MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { Heart } from '../../assets/svg/Heart';
import { User } from '../../assets/svg/User';
interface EventCardProps {
  imageUrl: string;
  name: string;
  description: string;
  url: string;
  votos: string;
}

const EventCard: FC<EventCardProps> = ({
  imageUrl,
  name,
  description,
  url,
  votos,
}) => {

  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <Link href={url}>
      <div className="relative rounded-xl overflow-hidden max-w-[298px] h-[454px] bg-white border-solid border-black card-shadow mb-1">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[239px] object-cover"
        />
        <div className="absolute top-[205px] right-4">
         <span onClick={handleClick}>
         <Heart isActive={isActive}  />
          </span> 
        </div>
        <div className="w-full px-4 py-3 bg-white bg-opacity-70">
          <h3 className="app-title-3">{name}</h3>
          <div className="subtitle-opacity mt-1 h-[72px] overflow-hidden">
            <p className="app-text-1 leading-[18px] text-app-grayDark">
              {description}
            </p>
          </div>
          <p className="mt-3 text-app-blue font-medium text-sm">ladygaga.com</p>
          <div className="flex gap-2 mt-2">
            <User />
            <p className="app-text-2 font-semibold mt-[4.4px]">{votos} votos</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
