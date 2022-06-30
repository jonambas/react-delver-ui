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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff,
      0 0 0 4px ${({ theme }) => theme.colors.gray[800]};
  }
`;

const StyledContainer = styled(Box)`
  ${css({
    p: '100',
    bg: 'white',
    borderRadius: '300',
    fontSize: '300',
    boxShadow: '0 5px 20px #ECEFF8, 0 2px 8px #C3CDDD'
  })}
`;

type SelectProps = RSelect.SelectProps & {
  options?: Array<{
    value: unknown;
    text: React.ReactNode;
  }>;
};

const StyledOptionText = styled(Box)`
  ${css({
    fontSize: '300',
    color: 'gray.800'
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
    ${css({ bg: 'gray.200' })}
    ${StyledOptionText} {
      ${css({ color: 'gray.900' })}
    }
  }

  ${(props) => {
    if (props['data-state'] === 'checked') {
      return css({ fontWeight: '600' });
    }
  }}
`;

export const Select: React.FC<SelectProps> = (props) => {
  const { value, onValueChange, options, ...rest } = props;

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
                  <RSelect.Item
                    key={String(opt.value)}
                    value={opt.value as string}
                    asChild
                  >
                    <StyledOption>
                      <RSelect.ItemText asChild>
                        <StyledOptionText>{opt.text}</StyledOptionText>
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
