import { FC, MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { Heart } from '../../assets/svg/Heart';
import { User } from '../../assets/svg/User';
interface SearchCardProps {
  imageUrl: string;
  name: string;
  description: string;
  url: string;
  votos: number;
  reference_link: string;
}

const SearchCard: FC<SearchCardProps> = ({
  imageUrl,
  name,
  description,
  url,
  votos,
  reference_link
}) => {

  const [isActive, setIsActive] = useState<boolean>(false);


  const handleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <div className=''>
      <Link  href={url} className="relative flex gap-6 rounded-xl overflow-hidden max-w-[934px] h-[239px] mx-auto bg-white border-solid border-black card-shadow mb-1">
        <img
          src={imageUrl}
          alt={name}
          className="w-1/3 h-[239px] object-cover rounded-xl"
        />
        <div className="absolute top-1 right-2">
         <span onClick={handleClick}>
         <Heart className='hover:scale-125 active:scale-75 transition-transform duration-300' isActive={isActive}  />
          </span> 
        </div>
        <div className="flex flex-col justify-center w-2/3 px-4 py-3 bg-white bg-opacity-70">
          <h3 className="app-title-3">{name}</h3>
          <div className="subtitle-opacity mt-1 h-[72px] overflow-hidden">
            <p className="app-text-1 leading-[18px] text-app-grayDark">
              {description}
            </p>
          </div>
          <p className="mt-3 text-app-blue font-medium text-sm">{reference_link}</p>
          <div className="flex gap-2 mt-2">
            <User />
            <p className="app-text-2 font-semibold mt-[4.4px]">{votos} votos</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchCard;
