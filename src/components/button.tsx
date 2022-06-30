import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { buttonReset } from '@sweatpants/button';

const StyledButton = styled.button`
  ${buttonReset}
  transition: 0.15s;
  user-select: none;

  ${({ disabled }) =>
    css({
      px: '200',
      py: '200',
      fontSize: '200',
      color: disabled ? 'gray.500' : 'gray.1000',
      borderRadius: '200'
    })}

  ${({ disabled }) => `cursor: ${disabled ? 'not-allowed' : 'pointer'};`}

  &:hover:not(:disabled) {
    ${css({
      bg: 'gray.100'
    })}
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const Button: FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  return <StyledButton type="button" {...props} />;
};
