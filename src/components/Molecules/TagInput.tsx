import React, { useState } from 'react';
import Select, { InputActionMeta, components, MenuProps } from 'react-select';
import styled, { useTheme } from 'styled-components';

type Tag = string;

interface Props {
  onChange: (value: unknown) => void;
  width?: number;
  value: Tag[];
}

const defaultTags = [
  {
    value: 1,
    label: '개발자',
  },
  {
    value: 2,
    label: '학생',
  },
];

const TagInput = ({ onChange, width, value }: Props) => {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<{ value: number; label: string }>>(defaultTags);
  const handleInputChange = (query: string, { action }: InputActionMeta) => {
    if (action === 'input-change') {
      setOpenMenu(true);
    }
  };

  const hideMenu = () => {
    setOpenMenu(false);
  };

  const Menu = ({ innerProps, ...props }: MenuProps) => {
    // const onMouseDown = (e) => e.target.type !== 'input' && innerProps.onMouseDown(e);
    return <components.Menu {...props} innerProps={{ ...innerProps }} />;
  };

  return (
    <Select
      value={null}
      onInputChange={handleInputChange}
      onChange={hideMenu}
      onBlur={hideMenu}
      options={tags}
      placeholder={'태그를 입력하세요 (최대 4개)'}
      menuIsOpen={openMenu}
      components={{ Menu }}
      isOptionDisabled={(option) => value.length >= 4}
      styles={{
        dropdownIndicator: (defaultStyles) => ({
          ...defaultStyles,
          display: 'none',
        }),
        container: (defaultStyles) => ({
          ...defaultStyles,
          width: 500,
        }),
        control: (defaultStyles, { isFocused }) => ({
          ...defaultStyles,
          border: 'none',
          width: 500,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          outline: 'none !important',
          ':focus': {
            outline: 'none !important',
          },
        }),
        placeholder: (defaultStyles) => ({
          ...defaultStyles,
          color: theme.colors.dark.a2,
          fontFamily: theme.font.NotoSansKRRegular,
          fontSize: '25px',
          lineHeight: '36px',
        }),
        indicatorSeparator: (defaultStyles) => ({
          ...defaultStyles,
          display: 'none',
        }),
        menu: (defaultStyles) => ({
          ...defaultStyles,
          background: '#FFFFFF',
          boxShadow: '0px 0px 20px rgba(143, 146, 148, 0.2)',
          borderRadius: '5px',
          left: '15px',
          height: '175px',
          display: 'grid',
        }),
        menuList: (defaultStyles) => ({
          ...defaultStyles,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '20px',
        }),
        option: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '105px',
          height: '35px',
          background: '#F2F3F9',
          borderRadius: '50px',
        }),
      }}
    />
  );
};

export default TagInput;