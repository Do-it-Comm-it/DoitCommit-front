import styled from 'styled-components';
import React from 'react';

type T = {
  id: string | number;
  label: string;
};

type DISelectorProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  ItemList?: Array<T>;
  onChange: () => void;
};

const defaultList = [
  { id: '1', label: 'Java' },
  { id: '2', label: 'Javascript' },
  { id: '3', label: 'Typescript' },
];

const DISelector = ({
  ItemList = defaultList,
  onChange,
  width = 200,
  height = 40,
}: DISelectorProps) => {
  return (
    <Selector width={width} height={height} onChange={onChange}>
      {ItemList.map((item) => (
        <Option key={item.id} value={item.label}>
          {item.label}
        </Option>
      ))}
    </Selector>
  );
};

const Selector = styled.select<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.8em 0.5em;
  border-radius: 8px;
  border: 1px solid #999;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  //Explore style problem.
  select::-ms-expand {
    display: none;
  }
`;

const Option = styled.option`
  background: #e3f8c8;
  color: #fff;
  padding: 3px 0;
`;

export default DISelector;
