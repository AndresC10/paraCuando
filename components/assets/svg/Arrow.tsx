import { FC } from 'react';

interface IArrow extends React.ComponentPropsWithoutRef<'svg'> {}

export const Arrow: FC<IArrow> = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L5 6L0 1L0.8875 0.1125L5 4.225L9.1125 0.1125L10 1Z"
        fill="#A7A6A7"
      />
    </svg>
  );
};
