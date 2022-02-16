import React from 'react';
import Select from 'react-select';
import options from '@src/data/techListData';
import styled, { useTheme } from 'styled-components';
import { Tech } from '@src/typings/Tech';

interface Props {
  onChange: (value: unknown) => void;
  width?: number;
  value?: Tech[];
}
const SelectInput = ({ onChange, width, value }: Props) => {
  const theme = useTheme();
  return (
    <TechSelect
      value={value}
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
          borderRadius: 30,
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: theme.colors.main,
        }),
        multiValueLabel: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.main,
          color: '#ffffff',
        }),
        multiValueRemove: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          alignItems: 'center',
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: theme.colors.main,
          marginRight: -6,
          marginTop: -5,
          marginBottom: -5,
          color: '#FFFFFF',
        }),
      }}
    />
  );
};

const TechSelect = styled(Select)<{ width?: number }>`
  width: ${({ width }) => width}%;
`;

export default React.memo(SelectInput, (prev, next) => prev.value === next.value);
