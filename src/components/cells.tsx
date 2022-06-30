import React from 'react';
import { Box } from '@sweatpants/box';

export const NameHeaderCell = () => {
  return (
    <Box py="200" px="200" fontWeight="400" fontSize="300">
      Name
    </Box>
  );
};

export const InstancesHeaderCell = () => {
  return (
    <Box py="200" px="200" fontWeight="400" fontSize="300">
      Instances
    </Box>
  );
};

export const FromHeaderCell = () => {
  return (
    <Box py="200" fontWeight="400" fontSize="300">
      From
    </Box>
  );
};

export const NameCell = (props) => {
  return (
    <Box py="200" px="200" fontWeight="600" fontSize="300">
      {props.getValue()}
    </Box>
  );
};

export const InstancesCell = (props) => {
  return (
    <Box
      py="200"
      px="200"
      fontWeight="400"
      fontSize="300"
      textAlign="right"
      style={{
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      {props.getValue()}
    </Box>
  );
};

export const FromCell = (props) => {
  return (
    <Box py="200" fontWeight="400" fontSize="300">
      {props.getValue()}
    </Box>
  );
};
