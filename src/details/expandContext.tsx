import React, { FC, PropsWithChildren } from 'react';

export const RowExpandContext = React.createContext<{
  expand?: boolean;
  toggle?: (t: boolean) => void;
}>({});

export const RowExpandContextProvider: FC<PropsWithChildren> = (props) => {
  const [expand, toggle] = React.useState(false);
  return (
    <RowExpandContext.Provider value={{ expand, toggle }}>
      {props.children}
    </RowExpandContext.Provider>
  );
};
