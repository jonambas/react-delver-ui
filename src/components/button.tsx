import React from 'react';
import { Button as SPButton, ButtonProps } from '@sweatpants/button';

type Props = ButtonProps<'button'>;

export const Button = (props: Props) => {
  return (
    <SPButton
      px="200"
      py="200"
      // bg="gray.100"
      fontSize="200"
      color={props.disabled ? 'gray.500' : 'gray.1000'}
      // borderRadius="200"
      style={{
        cursor: props.disabled ? 'not-allowed' : 'pointer'
      }}
      {...props}
    />
  );
};
