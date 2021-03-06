import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import * as RSelect from '@radix-ui/react-select';
import { Box } from '@sweatpants/box';
import { Button } from '@sweatpants/button';
import { Down } from './icons';

const StyledTrigger = styled(Button)`
  height: 38px;
  transition: 0.15s;

  ${css({
    fontSize: '300',
    px: '300',
    py: '0',
    border: '400',
    borderRadius: '200',
    color: 'gray.900'
  })}

  &:hover {
    ${css({
      borderColor: 'blue.active'
    })}
  }

  &:focus {
    border: 1px solid transparent;
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.blue.active};
  }
`;

const StyledContainer = styled(Box)`
  ${css({
    p: '100',
    bg: 'white',
    borderRadius: '200',
    boxShadow: '0 5px 20px #ECEFF8, 0 2px 8px #C3CDDD'
  })}
`;

type SelectProps = RSelect.SelectProps & {
  options?: Array<string>;
};

const StyledOptionText = styled(Box)`
  ${css({
    fontSize: '300'
  })}
`;

const StyledOption = styled(Box)`
  cursor: pointer;

  ${css({
    px: '400',
    py: '200',
    borderRadius: '200',
    fontSize: '300'
  })}

  &:hover, &:focus {
    outline: none;
    ${css({ bg: 'blue.active' })}
    ${StyledOptionText} {
      ${css({ color: 'white' })}
    }
  }

  ${(props) => {
    if (props['data-state'] === 'checked') {
      return css({ color: 'blue.active' });
    }
  }}
`;

export const Select: React.FC<SelectProps> = (props) => {
  const { value, onValueChange, options } = props;

  return (
    <RSelect.Root value={value} onValueChange={onValueChange}>
      <RSelect.Trigger asChild>
        <StyledTrigger>
          <Box display="flex" alignItems="center">
            <Box as="span" pr="100">
              <RSelect.Value />
            </Box>
            <Down />
          </Box>
        </StyledTrigger>
        {/* <RSelect.Value />
        <RSelect.Icon /> */}
      </RSelect.Trigger>

      <RSelect.Content>
        <StyledContainer>
          {/* <RSelect.ScrollUpButton /> */}
          <RSelect.Viewport>
            <RSelect.Item value="" asChild>
              <StyledOption>
                <RSelect.ItemText>
                  <StyledOptionText>All Froms</StyledOptionText>
                </RSelect.ItemText>
              </StyledOption>
            </RSelect.Item>
            <RSelect.Item value="indeterminate" asChild>
              <StyledOption>
                <RSelect.ItemText>
                  <StyledOptionText>Indeterminate</StyledOptionText>
                </RSelect.ItemText>
              </StyledOption>
            </RSelect.Item>
            <RSelect.Separator asChild>
              <Box height="1px" my="100" bg="gray.100" />
            </RSelect.Separator>
            {options &&
              options.map((opt) => {
                return (
                  <RSelect.Item key={String(opt)} value={opt as string} asChild>
                    <StyledOption>
                      <RSelect.ItemText asChild>
                        <StyledOptionText>{opt}</StyledOptionText>
                      </RSelect.ItemText>
                    </StyledOption>
                  </RSelect.Item>
                );
              })}
          </RSelect.Viewport>
          {/* <RSelect.ScrollDownButton /> */}
        </StyledContainer>
      </RSelect.Content>
    </RSelect.Root>
  );
};
