import React from 'react';
import Select from 'react-select';
import options from '@src/data/techListData';
import styled, { useTheme } from 'styled-components';

interface Props {
  onChange: (value: unknown) => void;
  width?: number;
}
const SelectInput = ({ onChange, width }: Props) => {
  const theme = useTheme();
  return (
    <TechSelect
      width={width}
      onChange={onChange}
      options={options}
      isMulti
      placeholder={'EX) Java, C#, Javascript'}
      styles={{
        input: (defaultStyles) => ({
          ...defaultStyles,
          height: 45,
        }),
        placeholder: (defaultStyles) => ({
          ...defaultStyles,
          color: theme.colors.dark.a2,
        }),
        multiValue: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          borderRadius: 5,
          backgroundColor: theme.colors.main,
        }),
        multiValueLabel: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 5,
          paddingRight: 5,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: theme.colors.main,
          color: theme.colors.background,
        }),
        multiValueRemove: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          alignItems: 'center',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: theme.colors.main,
          color: theme.colors.background,
        }),
      }}
    />
  );
};

const TechSelect = styled(Select)<{ width?: number }>`
  width: ${({ width }) => width}px;
`;

export default SelectInput;
