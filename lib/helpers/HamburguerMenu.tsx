import Link from 'next/link';
import { useState } from 'react';
import { Hamburguer } from '../../components/assets/svg/Hamburguer';

function HamburguerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className='relative'>
      
      <div className="flex justify-center relative">
        <button onClick={toggleMenu} className={`${isOpen ? 'relative flex items-center justify-center p-10' : 'inline-flex items-center justify-center p-10 rounded-md '}`}>
          <div>
              <Hamburguer />
          </div>
        </button>
      </div>
      <div className={`${isOpen ? 'flex flex-col gap-2 opacity-100 transition-opacity duration-500' : 'hidden opacity-0 transition-opacity duration-500'} card-shadow !bg-black-with-opacity mt-2 py-2 absolute top-40 w-full rounded-md shadow-xl z-50`}>
      <Link href="#" className="text-center app-subtitle-1 text-black hover:bg-gray-100">Brands And Stories</Link>
      <Link href="#" className="text-center app-subtitle-1 text-black hover:bg-gray-100">Events</Link>
      <Link href="#" className="text-center app-subtitle-1 text-black hover:bg-gray-100">Music</Link>
      </div>
    </div>
  );
}

export default HamburguerMenu;
