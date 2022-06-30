import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@sweatpants/box';
import type { Header, SortDirection } from '@tanstack/react-table';
import { buttonReset } from '@sweatpants/button';

const StyledSortButton = styled.button`
  ${buttonReset}

  ${css({
    // fontSize: '300',
    // px: '300',
    // py: '0',
    // border: '400',
    borderRadius: '200',
    color: 'gray.900'
  })}

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
  const { children, toggle } = props;
  return (
    <StyledSortButton as="button" onClick={(e) => toggle(e)}>
      {children}
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
    <Box as="th" width={width}>
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
