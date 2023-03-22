import Link from 'next/link';
import { IconLogo } from '../../assets/logo/IconLogo';

const Header = () => {
  let logged;

  return (
    <div className="bg-black text-white flex items-center justify-between px-4 sm:px-12 py-4 min-h-[70px] text-sm">
      <Link href={'/'}>
        <IconLogo />
      </Link>
      <div className="flex items-center justify-between gap-4">
        <Link href={'/post'} className="text-app-blue">
          <button>+ Crear publicación</button>
        </Link>
        {!logged && (
          <>
            <Link href={'/sign_in'}>
              <button>Log Ing</button>
            </Link>
            <Link href={'/sign_up'}>
              <button>Sign Up</button>
            </Link>
          </>
        )}
        {logged && (
          <>
            <Link href={'/sign_in'}>
              <button>Mis votos</button>
            </Link>
            <Link href={'/sign_up'}>
              <button>Perfil</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
