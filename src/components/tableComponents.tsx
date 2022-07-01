import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@sweatpants/box';
import {
  Table,
  Header,
  Column,
  SortDirection,
  Cell,
  flexRender
} from '@tanstack/react-table';
import type { Result } from 'react-delver';
import { ArrowDown, ArrowUp } from '@src/components/icons';
import { Button } from '@src/components/button';

const StyledSortButton = styled(Button)`
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.blue.active};
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
    <StyledSortButton onClick={toggle} active={isSorted !== false}>
      {children}
      <Box as="span" display="inline-flex" pl="100">
        {icon}
      </Box>
    </StyledSortButton>
  );
};

type ThProps = Header<Result>;

export const Th: FC<ThProps> = (props) => {
  const { column, getContext, id } = props;
  const { getCanSort, getIsSorted, getToggleSortingHandler } = column;

  let width = 'auto';
  let align = 'start';

  if (id === 'count') {
    width = '25%';
    align = 'end';
  }

  if (id === 'location') {
    width = '20%';
  }

  if (id === 'actions') {
    width = '10%';
  }

  if (id === 'name' || id === 'props') {
    width = '45%';
  }

  const render = column.columnDef.header;
  const content = flexRender(render as string | JSX.Element, getContext());

  return (
    <Box as="th" pb="100" width={width}>
      <Box display="flex" justifyContent={align}>
        {getCanSort() ? (
          <ThSort isSorted={getIsSorted()} toggle={getToggleSortingHandler()}>
            {content}
          </ThSort>
        ) : (
          content
        )}
      </Box>
    </Box>
  );
};

type ThrProps = {
  headers: Header<Result>[];
};

export const Thr = (props: ThrProps) => {
  const { headers } = props;

  return (
    <Box as="tr" borderBottom="1px solid #000" borderColor="gray.200">
      {headers.map((header) => {
        return <Th key={header.id} {...header} />;
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

const StyledTr = styled.tr<{ $clickable?: boolean }>`
  ${({ $clickable }) => ($clickable ? 'cursor: pointer;' : '')}
  ${css({
    borderBottom: '400'
  })}

  td {
    transition: 0.1s;
    vertical-align: top;
  }

  &:hover td {
    ${css({
      bg: 'gray.75'
    })}
  }
`;

type TrProps = {
  cells?: Cell<Result>[];
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
};

export const Tr: FC<TrProps> = (props) => {
  const { cells, onClick } = props;

  return (
    <StyledTr as="tr" onClick={onClick} $clickable={!!onClick}>
      {cells.map((cell) => {
        const render = cell.column.columnDef.cell;
        const content = flexRender(
          render as string | JSX.Element,
          cell.getContext()
        );
        return <Td key={cell.id}>{content}</Td>;
      })}
    </StyledTr>
  );
};
