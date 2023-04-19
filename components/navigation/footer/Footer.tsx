import { useRouter } from 'next/router';
import { useState } from 'react';

export function Footer() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      router.push(`/search?query=${searchValue}`);
    }
  };

  return (
    <div className='min-h-[483px] relative bottom-0 w-[100%] flex justify-center items-center bg-[url("/footer-banner.png")] bg-cover bg-center '>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchValue"
          placeholder="¿Qué quieres ver en tu ciudad?"
          onChange={handleChange}
          className='md:ml-0 px-6 py-4 rounded-3xl w-full sm:w-[465px] border-2 bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
        />
      </form>
    </div>
  );
}
