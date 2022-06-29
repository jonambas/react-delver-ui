import React from 'react';
import styled from 'styled-components';
import { Box } from '@sweatpants/box';
import type { Header } from '@tanstack/react-table';
import type { Row } from '__delverData';

export const Th = (props: React.PropsWithChildren<{}>) => {
  const { children, ...rest } = props;
  return (
    <Box as="th" textAlign="left" {...rest}>
      {props.children}
    </Box>
  );
};

type ThrProps = {
  headers: Record<string, any>[];
};

export const Thr = (props: ThrProps) => {
  const { headers, ...rest } = props;

  return (
    <Box as="tr" {...rest}>
      {headers.map((col) => {
        return <Th key={col.id}>{col.renderHeader()}</Th>;
      })}
    </Box>
  );
};

export const Td = (props: React.PropsWithChildren<{}>) => {
  const { children, ...rest } = props;
  return (
    <Box as="td" textAlign="left" {...rest}>
      {props.children}
    </Box>
  );
};

const StyledTr = styled.tr`
  border-bottom: 1px solid #eee;
  td {
    transition: 0.1s;
  }
  &:hover td {
    background: #f0f0fa;
  }
`;

export const Tr = (props: { cells: any }) => {
  const { cells, ...rest } = props;
  return (
    <StyledTr as="tr" {...rest}>
      {cells.map((cell) => {
        return <Td key={cell.id}>{cell.renderCell()}</Td>;
      })}
    </StyledTr>
  );
};
