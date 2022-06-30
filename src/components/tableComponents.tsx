import React from 'react';
import styled from 'styled-components';
import { Box } from '@sweatpants/box';
import type { Header, Overwrite } from '@tanstack/react-table';
import type { Row } from '__delverData';

export const Th = (props: Header<any>) => {
  const { renderHeader, id } = props;

  let width = 'auto';
  if (id === 'count') {
    width = '25%';
  }

  if (id === 'name') {
    width = '45%';
  }

  return (
    <Box as="th" textAlign="left" width={width}>
      {renderHeader()}
    </Box>
  );
};

type ThrProps = {
  headers: Header<any>[];
};

export const Thr = (props: ThrProps) => {
  const { headers, ...rest } = props;

  return (
    <Box as="tr" borderBottom="1px solid #000" borderColor="gray.200" {...rest}>
      {headers.map(({ id, ...rest }) => {
        return <Th key={id} id={id} {...rest} />;
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  td {
    transition: 0.1s;
  }
  &:hover td {
    background: ${({ theme }) => theme.colors.gray[100]};
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
