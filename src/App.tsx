import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@sweatpants/box';
import { Theme } from '@src/components/theme';
import { Dashboard } from '@src/dashboard';
import { Details } from '@src/details';

export const App = () => {
  return (
    <BrowserRouter>
      <Theme>
        <Box as="main" mx="auto" my="800" width="80%" maxWidth="700px">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/component/:name" element={<Details />} />
          </Routes>
        </Box>
      </Theme>
    </BrowserRouter>
  );
};
