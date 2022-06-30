import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@sweatpants/box';
import { InlineCode } from './inlineCode';

export const NameHeaderCell = (): JSX.Element => {
  return (
    <Box fontWeight="400" fontSize="300">
      Name
    </Box>
  );
};

export const InstancesHeaderCell = (): JSX.Element => {
  return (
    <Box fontWeight="400" fontSize="300">
      Instances
    </Box>
  );
};

export const FromHeaderCell = (): JSX.Element => {
  return (
    <Box fontWeight="400" fontSize="300">
      From
    </Box>
  );
};

type CellProps = {
  getValue?: () => string | number;
};

export const NameCell = (props: CellProps): JSX.Element => {
  return (
    <Box
      as={Link}
      to={`/component/${String(props.getValue()).toLowerCase()}`}
      py="200"
      px="200"
      fontWeight="600"
      fontSize="300"
    >
      {props.getValue()}
    </Box>
  );
};

export const InstancesCell = (props: CellProps): JSX.Element => {
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

export const FromCell = (props: CellProps): JSX.Element => {
  return (
    <Box py="200" px="200" fontWeight="400" fontSize="300">
      <InlineCode>{props.getValue()}</InlineCode>
    </Box>
  );
};
