import React, { FC, PropsWithChildren } from 'react';
import { Box } from '@sweatpants/box';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button } from '@src/components/button';
import { useComponent } from '@src/hooks';
import { ArrowLeft } from '@src/components/icons';
import { Table } from './table';

const Back: FC<PropsWithChildren> = () => {
  return (
    <Button as={Link} to="/">
      <Box as="div" display="inline-flex" alignItems="center">
        <Box pr="100" mt="2px">
          <ArrowLeft />
        </Box>
        Back
      </Box>
    </Button>
  );
};

export const Details: FC = () => {
  const { name } = useParams();
  const component = useComponent(name);

  return (
    <Box>
      <Box mb="600" ml="-0.5rem">
        <Back />
      </Box>
      <Box mb="600">
        <Box as="h1" fontSize="500" mb="200">
          {component.name}
        </Box>
        <Box fontSize="200">
          {component.instances.length.toLocaleString()} instances found
        </Box>
      </Box>
      <Table instances={component.instances} />
    </Box>
  );
};
