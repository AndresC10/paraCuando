import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IconLogo } from '../../assets/logo/IconLogo';
import { Arrow } from '../../assets/svg/Arrow';
import { Avatar } from '../../assets/svg/Avatar';
import { Configuration } from '../../assets/svg/Configuration';
import { Logout } from '../../assets/svg/Logout';
import { Simpleheart } from '../../assets/svg/SimpleHeart';

const Header = () => {
  const [token, setToken] = useState<string>();
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { data } = useSWR('/auth/me');

  useEffect(() => {
    setToken(Cookies.get('token'));
  }, []);

  return (
    <div className="bg-black text-white flex items-center justify-between px-4 sm:px-12 py-4 min-h-[70px] text-sm">
      <Link href={'/'}>
        <IconLogo />
      </Link>
      <div className="flex items-center justify-between gap-4">
        <Link href={'/post'} className="text-app-blue hidden md:block">
          <button>+ Crear publicación</button>
        </Link>
        {!token && (
          <>
            <Link href={'/sign_in'} className="hidden md:block">
              <button>Log Ing</button>
            </Link>
            <Link href={'/sign_up'} className="hidden md:block">
              <button>Sign Up</button>
            </Link>
          </>
        )}
        {token && (
          <>
            <Link href={'/profile'} className="ml-[50px] hidden md:block">
              <button className="flex gap-2">
                <Simpleheart /> Mis votos
              </button>
            </Link>
            <div className="ml-[42px]">
              <button className="flex gap-3 items-center">
                <div className="border-2 border-white rounded-full w-[32px] h-[32px] flex items-center justify-center">
                  <Avatar />
                </div>
                <span>{data?.results.email}</span>
              </button>
            </div>
            <button onClick={() => setModal(!modal)}>
              <Arrow />
            </button>
            <div
              className={`fixed w-[198px] h-[171px] -right-full bg-white text-black z-50 flex flex-col items-center gap-[21px] pt-[35px] pb-[28px] rounded-[20px] ${
                modal && 'opened'
              }`}
            >
              <div className="flex gap-6">
                <Configuration />
                <Link href={'/profile/config'}>Configuración</Link>
              </div>
              <div className="flex gap-6">
                <Logout />
                <button
                  onClick={() => {
                    Cookies.remove('token');
                    setToken('');
                    router.push('/');
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
              <div className=" w-[171px] border-[1px] border-[#A7A6A7] -mt-2"></div>
              <span>Ayuda y soporte</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
