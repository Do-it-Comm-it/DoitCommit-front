import React, { ReactNode, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import DIInput from '../Atoms/DIInput';
import { RiArrowDropDownFill } from 'react-icons/ri';

const Z = 1000;

type DropDownProps<T> = {
  width?: number;
  height?: number;
  items: Array<T>;
  placeholder?: string;
  onSelect: (text: string) => void;
};
//Reference: How to extend generic type for functional components.
//https://stackoverflow.com/questions/51459971/type-of-generic-stateless-component-react-or-extending-generic-function-interfa

const DropDown = <T extends unknown>({
  width = 300,
  height = 50,
  items,
  onSelect,
  placeholder,
}: DropDownProps<T>) => {
  const [isActive, setIsActive] = useState(false);
  const [list, setList] = useState<T[] | null>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (value.length > 0) {
      setIsActive(true);
      const result = items.filter((item) => (item as string).includes(value));
      setList(result);
    } else {
      setIsActive(false);
      setList(null);
    }
  }, [value, items]);

  const onToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback(
    (e) => {
      const targetId = e.target.id;
      if (targetId === 'item_name') {
        onSelect(e.target.innerText);
      }
      setIsActive((prev) => !prev);
      setValue('');
    },
    [onSelect]
  );

  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  return (
    <Container width={width} height={height}>
      <Search>
        <DropIcon size={30} onClick={onToggle} />
        <Body
          placeholder={placeholder}
          defaultValue={value}
          isActive={isActive}
          width={width}
          onChange={onChangeText}
        />
      </Search>
      <Menu width={width} isActive={isActive}>
        {list
          ? list.map((item, index) => (
              <MenuItem id="item" key={index} onClick={onSelectItem}>
                <Item id="item_name">{item as ReactNode}</Item>
              </MenuItem>
            ))
          : items.map((item, index) => (
              <MenuItem id="item" key={index} onClick={onSelectItem}>
                <Item id="item_name">{item as ReactNode}</Item>
              </MenuItem>
            ))}
      </Menu>
    </Container>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  &:hover {
    cursor: pointer;
  }
`;

const Body = styled(DIInput)<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.colors.sub};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
`;
const Menu = styled.div<{ width: number; isActive: boolean }>`
  position: absolute;
  z-index: ${Z};
  width: ${({ width }) => width + 5}px;
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  display: ${({ isActive }) => (isActive ? `block` : `none`)};

  border-bottom-left-radius: ${({ isActive }) => (isActive ? 20 : 0)}px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.sub};
    left: 5px;
    border-bottom-right-radius: ${({ isActive }) => (isActive ? 20 : 0)}px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary.default};
    border-radius: 6px;
  }
`;
const MenuItem = styled.div`
  z-index: ${Z};
  height: 30px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.sub};
`;
const Item = styled.div`
  z-index: ${Z + 1};
  height: 30px;
`;
const DropIcon = styled(RiArrowDropDownFill)`
  position: absolute;
  right: 0;
  top: 2px;
`;
const Search = styled.div`
  position: relative;
`;
export default DropDown;
