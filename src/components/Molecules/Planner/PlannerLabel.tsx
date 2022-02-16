import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

type PlannerLabelProps = {
  level?: string;
  name?: string;
};

const PlannerLabel = ({ level, name }: PlannerLabelProps) => {
  const label = useMemo(() => {
    switch (level) {
      case 'LOW':
        return {
          color: '#4F8234',
          backgroundColor: '#E3F4E4',
          label: 'Low',
        };
      case 'MEDIUM':
        return {
          color: '#5872CF',
          backgroundColor: '#E6F3FE',
          label: 'Medium',
        };
      case 'HIGH':
        return {
          color: '#E24781',
          backgroundColor: '#FDECF2',
          label: 'High',
        };
      default:
        return {
          color: '#8F9294',
          backgroundColor: '#476CFF',
          label: name ?? 'Study',
        };
    }
  }, [level, name]);

  return (
    <Container background={label.backgroundColor} color={label.color}>
      {name ?? label.label}
    </Container>
  );
};

const Container = styled.div<{ background: string; color: string }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 22px;

  position: static;

  background: ${({ background }) => background ?? '#ffffff'};
  color: ${({ color }) => color};
  border-radius: 50px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 5px;
`;

export default PlannerLabel;
