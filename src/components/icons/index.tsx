import React, { FC } from 'react';

export const Search: FC<React.ComponentPropsWithoutRef<'svg'>> = () => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
    >
      <path
        d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z"
        stroke="currentColor"
      ></path>
    </svg>
  );
};

export const Down: FC<React.ComponentPropsWithoutRef<'svg'>> = () => {
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

export const ArrowDown: FC<React.ComponentPropsWithoutRef<'svg'>> = () => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
    >
      <path
        d="M9.854 8.854l.353-.354-.707-.707-.354.353.708.708zM7.5 10.5l-.354.354.354.353.354-.353L7.5 10.5zM5.854 8.146L5.5 7.793l-.707.707.353.354.708-.708zm3.292 0l-2 2 .708.708 2-2-.708-.708zm-1.292 2l-2-2-.708.708 2 2 .708-.708zM8 10.5V4H7v6.5h1z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const ArrowUp: FC<React.ComponentPropsWithoutRef<'svg'>> = () => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
    >
      <path
        d="M5.146 6.146l-.353.354.707.707.354-.353-.708-.708zM7.5 4.5l.354-.354-.354-.353-.354.353.354.354zm1.646 2.354l.354.353.707-.707-.353-.354-.708.708zm-3.292 0l2-2-.708-.708-2 2 .708.708zm1.292-2l2 2 .708-.708-2-2-.708.708zM7 4.5V11h1V4.5H7z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const ArrowLeft: FC<React.ComponentPropsWithoutRef<'svg'>> = () => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
    >
      <path d="M1.5 7.5l4-4m-4 4l4 4m-4-4H14" stroke="currentColor"></path>
    </svg>
  );
};
export const Info: FC<React.ComponentPropsWithoutRef<'svg'>> = (props) => {
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
        d="M7 4.5V5h1v-.5H7zm1-.01v-.5H7v.5h1zM8 11V7H7v4h1zm0-6.5v-.01H7v.01h1zM6 8h1.5V7H6v1zm0 3h3v-1H6v1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
