import React, { FC } from 'react';

export const Search: FC<React.ComponentPropsWithoutRef<'svg'>> = (props) => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      {...props}
    >
      <path
        d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z"
        stroke="currentColor"
      ></path>
    </svg>
  );
};

export const Down: FC<React.ComponentPropsWithoutRef<'svg'>> = (props) => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
    >
      <path
        d="M4.5 6.5l3 3 3-3"
        stroke="currentColor"
        strokeLinecap="square"
      ></path>
    </svg>
  );
};
