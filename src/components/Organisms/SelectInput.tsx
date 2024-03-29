import React, { useMemo } from 'react';
import Select from 'react-select';
import styled, { useTheme } from 'styled-components';
import { Tech } from '@src/typings/Tech';
import { useUserInterestTech } from '@src/hooks/useUser';

interface Props {
  onChange: (value: unknown) => void;
  width?: number;
  value?: Tech[];
}
const SelectInput = ({ onChange, width, value }: Props) => {
  const theme = useTheme();
  const { data: interestList } = useUserInterestTech();

  const options = useMemo(() => {
    if (interestList) {
      return interestList.map((interest: any) => ({
        value: interest.interestTechId,
        label: interest.interestTechNm,
      }));
    }
    return [];
  }, [interestList]);

  return (
    <TechSelect
      value={value}
      width={width}
      onChange={onChange}
      options={options}
      isMulti
      placeholder={'관심있는 분야'}
      styles={{
        valueContainer: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: theme.colors.gray.gray100,
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          height: 45,
        }),
        menu: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: theme.colors.gray.gray100,
          color: theme.colors.black,
        }),
        placeholder: (defaultStyles) => ({
          ...defaultStyles,
          color: theme.colors.black,
        }),
        multiValue: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          borderRadius: 30,
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: theme.colors.primary.default,
        }),

        indicatorsContainer: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: theme.colors.gray.gray100,
        }),
        multiValueLabel: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.primary.default,
          color: theme.colors.gray.gray100,
        }),
        multiValueRemove: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          alignItems: 'center',
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: theme.colors.primary.default,
          marginRight: -6,
          marginTop: -5,
          marginBottom: -5,
          color: theme.colors.gray.gray100,
        }),
      }}
    />
  );
};

const TechSelect = styled(Select)<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export default React.memo(
  SelectInput,
  (prev, next) => prev.value === next.value
);
