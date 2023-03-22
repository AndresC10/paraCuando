export function Footer() {
  return (
    <div className='min-h-[483px] absolute bottom-0 w-[100%] flex justify-center items-center bg-[url("/footer-banner.png")] bg-cover bg-center '>
      <input
        className='px-6 py-4 rounded-3xl w-full sm:w-[465px] bg-[url("/lens.png")] bg-no-repeat bg-[95%]'
        type="text"
        placeholder="¿Qué quieres ver en tu ciudad?"
      />
    </div>
  );
}
