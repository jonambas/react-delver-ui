import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@sweatpants/box';
import type { Header, SortDirection } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from '@src/components/icons';
import { Button } from '@src/components/button';

const StyledSortButton = styled(Button)`
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const ThSort: FC<
  PropsWithChildren<{
    isSorted?: false | SortDirection;
    toggle?: (e: unknown) => void;
  }>
> = (props) => {
  const { children, toggle, isSorted } = props;
  const icon =
    isSorted === 'desc' ? (
      <ArrowDown />
    ) : isSorted === 'asc' ? (
      <ArrowUp />
    ) : null;

  return (
    <StyledSortButton type="button" onClick={(e) => toggle(e)}>
      {children}
      <Box as="span" display="inline-flex" pl="100">
        {icon}
      </Box>
    </StyledSortButton>
  );
};

export const Th: FC<Header<any>> = (props) => {
  const { renderHeader, id, column, ...rest } = props;
  const { getCanSort, getIsSorted, getToggleSortingHandler } = column;

  let width = 'auto';
  let align = 'start';

  if (id === 'count') {
    width = '25%';
    align = 'end';
  }

  if (id === 'name') {
    width = '45%';
  }

  return (
    <Box as="th" pb="100" width={width}>
      <Box display="flex" justifyContent={align}>
        {getCanSort() ? (
          <ThSort isSorted={getIsSorted()} toggle={getToggleSortingHandler()}>
            {renderHeader()}
          </ThSort>
        ) : (
          renderHeader()
        )}
      </Box>
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
    <Box as="td" {...rest}>
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
