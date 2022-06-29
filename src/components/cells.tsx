import React from 'react';
import { Box } from '@sweatpants/box';

export const NameHeaderCell = (props) => {
  return (
    <Box py="200" px="200" fontWeight="400" fontSize="300">
      Name
    </Box>
  );
};

export const InstancesHeaderCell = (props) => {
  return (
    <Box py="200" px="200" fontWeight="400" fontSize="300" textAlign="right">
      Instances
    </Box>
  );
};

export const FromHeaderCell = (props) => {
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
