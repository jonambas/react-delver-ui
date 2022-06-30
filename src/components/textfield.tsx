import React from 'react';
import styled from 'styled-components';
import { Box } from '@sweatpants/box';

type TextFieldProps = React.ComponentPropsWithoutRef<'input'> & {
  icon?: React.ReactNode;
  id?: string;
};

const StyledWrapper = styled(Box)`
  transition: 0.15s;
  &:focus-within {
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.gray[800]};
  }

  input:focus {
  }
`;
const StyledInput = styled(Box)`
  border: none;
  background: none;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[900]};
    font-size: ${({ theme }) => theme.fontSizes[300]};
  }
`;

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { icon, ...rest } = props;
  return (
    <StyledWrapper
      borderRadius="200"
      // bg="gray.100"
      py="2px"
      px="300"
      border="400"
    >
      <Box display="flex" alignItems="center">
        <Box mt="2px">{icon && icon}</Box>
        <StyledInput
          as="input"
          type="text"
          width="100%"
          fontSize="300"
          px="200"
          py="200"
          {...rest}
        />
      </Box>
    </StyledWrapper>
  );
};