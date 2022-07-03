import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { buttonReset } from '@sweatpants/button';
import { polymorphicForwardRef } from '@sweatpants/utils';

const StyledButton = styled.button<{ $active?: boolean; py?: string }>`
  ${buttonReset}
  display: inline-block;
  transition: 0.15s;
  user-select: none;
  text-decoration: none;
  white-space: nowrap;

  ${({ disabled, $active, py }) =>
    css({
      px: '200',
      py: py || '200',
      fontSize: '200',
      color: disabled ? 'gray.500' : $active ? 'blue.active' : 'gray.1000',
      borderRadius: '200'
    })}

  ${({ disabled }) => `cursor: ${disabled ? 'not-allowed' : 'pointer'};`}

  &:hover:not(:disabled) {
    ${css({
      color: 'blue.active'
    })}
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.blue.active};
  }
`;

export const Button = polymorphicForwardRef<
  'button',
  { active?: boolean; py?: string }
>(function Button(props, ref) {
  const { active = false, ...rest } = props;
  return <StyledButton type="button" $active={active} {...rest} ref={ref} />;
});
