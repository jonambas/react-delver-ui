import { Box } from '@sweatpants/box';
import React, { FC, PropsWithChildren } from 'react';

export const InlineCode: FC<PropsWithChildren<{}>> = (props) => {
  return (
    <Box
      display="inline-block"
      fontFamily="mono"
      fontSize="0.82em"
      bg="gray.100"
      px="3px"
      py="3px"
      borderRadius="200"
      color="gray.900"
    >
      {props.children}
    </Box>
  );
};
