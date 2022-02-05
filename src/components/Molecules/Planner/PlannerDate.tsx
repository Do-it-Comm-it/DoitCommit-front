import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';

type PlannerDateProps = {
  selected: number;
  day: number;
  year: number;
  month: number;
  onChangeDate: () => void;
};
const DayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PlannerDate = ({ selected, year, month, day, onChangeDate }: PlannerDateProps) => {
  const startDayName = new Date(year, month).getDay();

  return (
    <Container selected={selected === day} onClick={onChangeDate}>
      <Day>{day}</Day>
      <Name>{convertDayToName((startDayName + day - 1) % 7)}</Name>
    </Container>
  );
};

export const convertDayToName = (day: number) => {
  return DayNames.filter((_, i) => i === day)[0];
};

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  width: 61px;
  height: 77px;
  background: ${({ theme, selected }) => (selected ? theme.colors.main : theme.colors.background)};
  flex-direction: column;
  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 59px;

  align-items: center;
  justify-content: center;

  color: ${({ selected, theme }) => (selected ? theme.colors.background : theme.colors.dark.a2)};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media ${devices.tablet} {
    width: 98px;
    height: 130px;
  }
`;

const Day = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
`;
const Name = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

export default PlannerDate;
