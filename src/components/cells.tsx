import React from 'react';
import styled from 'styled-components';
import { css } from '@styled-system/css';
import { Link } from 'react-router-dom';
import { Box } from '@sweatpants/box';
import { ScreenReaderOnly } from '@sweatpants/screenreaderonly';
import { Inline } from '@sweatpants/inline';
import { InlineCode } from './inlineCode';
import { Props } from '__delverData';
import { Button } from './button';
import { RowExpandContext } from '@src/details/expandContext';

type HeaderCellProps = {
  id?: string;
};

export const HeaderCell = (props: HeaderCellProps): JSX.Element => {
  return (
    <Box
      fontWeight="400"
      fontSize="300"
      style={{
        textTransform: 'capitalize'
      }}
    >
      {props.id}
    </Box>
  );
};

type CellProps = {
  getValue?: () => string | number | boolean;
};

const StyledNameLink = styled(Box)`
  ${css({ borderRadius: '200' })}
  &:hover {
    ${css({ color: 'blue.active' })}
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.blue.active};
  }
`;

export const NameCell = (props: CellProps): JSX.Element => {
  return (
    <StyledNameLink
      display="inline-block"
      as={Link}
      to={`/component/${String(props.getValue()).toLowerCase()}`}
      p="200"
      fontWeight="600"
      fontSize="300"
      color="gray.900"
    >
      <Box py="2px">{props.getValue()}</Box>
    </StyledNameLink>
  );
};

export const InstancesCell = (props: CellProps): JSX.Element => {
  return (
    <Box
      p="200"
      fontWeight="400"
      fontSize="300"
      textAlign="right"
      style={{
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      <Box py="2px">{props.getValue().toLocaleString()}</Box>
    </Box>
  );
};

export const FromCell = (props: CellProps): JSX.Element => {
  const v = props.getValue();
  if (!v) {
    return null;
  }
  if (v === 'indeterminate') {
    return (
      <Box p="200" fontWeight="400" fontSize="200" color="gray.400">
        <Box py="2px">Indeterminate</Box>
      </Box>
    );
  }

  return (
    <Box p="200" fontWeight="400" fontSize="300">
      <InlineCode>{v}</InlineCode>
    </Box>
  );
};

export const SpreadCell = (props: CellProps): JSX.Element => {
  const v = props.getValue();
  return (
    <Box
      p="200"
      fontWeight="400"
      fontSize="200"
      color={v ? 'gray.900' : 'gray.400'}
    >
      {v ? 'Yes' : 'No'}
    </Box>
  );
};

export const LocationCell = (props: CellProps): JSX.Element => {
  const s = String(props.getValue());
  const truncated = s.substring(s.length - 30, s.length);
  const isTruncated = s.length > 30;

  return (
    <Box p="200">
      <Box py="2px">
        <ScreenReaderOnly>{s}</ScreenReaderOnly>
        <Box fontWeight="400" fontSize="200" aria-hidden={true} title={s}>
          {isTruncated ? '..' : ''}
          {truncated}
        </Box>
      </Box>
    </Box>
  );
};

type PropsCellProps = {
  getValue?: () => Props;
};

export const PropsCell = (props: PropsCellProps): JSX.Element => {
  const p = props.getValue();
  const { expand } = React.useContext(RowExpandContext);

  if (!expand) {
    return (
      <Box px="200" py="200" fontSize="300">
        <Inline space="100">
          {p.map((prop) => {
            return (
              <Box key={prop.name}>
                <InlineCode>{prop.name}</InlineCode>
              </Box>
            );
          })}
        </Inline>
      </Box>
    );
  }

  return (
    <Box p="200" pr="0" fontSize="300">
      <Box
        display="grid"
        gridTemplateColumns="minmax(20px, auto) 1fr"
        fontFamily="mono"
        fontSize="0.8em"
        gridGap="300"
        color="gray.900"
        lineHeight="1.5em"
      >
        {p.map((prop) => {
          return (
            <React.Fragment key={prop.name}>
              <Box fontWeight="600" pr="200" style={{ wordBreak: 'break-all' }}>
                {prop.name}
              </Box>
              <Box>{String(prop.value)}</Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

type ActionCellProps = {
  data: Props;
};

const StyledActionCell = styled(Box)<{ $show?: any }>`
  opacity: 0;
  ${({ $show }) => ($show ? `opacity: 1;` : ``)}

  &:hover,
  &:focus-within {
    opacity: 1 !important;
  }
  tr:hover & {
    opacity: 1;
  }
`;

export const ActionCell = (props: ActionCellProps): JSX.Element => {
  const { data } = props;
  const { expand, toggle } = React.useContext(RowExpandContext);

  if (!data.length) {
    return null;
  }

  return (
    <StyledActionCell textAlign="right" py="200" $show={expand}>
      <Button onClick={() => toggle(!expand)} py="0">
        {expand ? 'Hide Props' : 'Expand Props'}
      </Button>
    </StyledActionCell>
  );
};
