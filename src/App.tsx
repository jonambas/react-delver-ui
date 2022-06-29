import React from 'react';
import { Box } from '@sweatpants/box';
import { Theme } from '@src/components/theme';
import { Table } from '@src/dashboard';

const config = __delverConfig;

export const App = () => {
  return (
    <Theme>
      <Box as="main" mx="auto" my="800" width="80%" maxWidth="700px">
        <Box as="h1" fontSize="500" mb="600">
          {config.title}
        </Box>
        <Table />
      </Box>
    </Theme>
  );
};
