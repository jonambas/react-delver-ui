import React from 'react';
import styled from 'styled-components';
import { css } from '@styled-system/css';
import { Box } from '@sweatpants/box';

type TextFieldProps = React.ComponentPropsWithoutRef<'input'> & {
  icon?: React.ReactNode;
  id?: string;
};

const StyledWrapper = styled(Box)`
  transition: 0.15s;
  &:focus-within {
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.blue.active};
  }
  &:hover {
    ${css({
      borderColor: 'blue.active'
    })}
  }
`;

const StyledInput = styled(Box)`
  border: none;
  background: none;
  outline: none;

  ::placeholder {
    ${css({
      color: 'gray.900',
      fontSize: '300'
    })}
  }
`;

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { icon, ...rest } = props;
  return (
    <StyledWrapper
      borderRadius="200"
      height="38px"
      py="2px"
      px="300"
      border="400"
    >
      <Box display="flex" alignItems="center" height="100%">
        <Box mt="2px">{icon && icon}</Box>
        <StyledInput
          as="input"
          type="text"
          width="100%"
          fontSize="300"
          px="200"
          height="100%"
          {...rest}
        />
      </Box>
    </StyledWrapper>
  );
};
