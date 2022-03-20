import { Tag } from '@src/typings/Board';
import React, { useCallback, useState } from 'react';
import Select, { InputActionMeta, components, MenuProps } from 'react-select';
import styled, { useTheme } from 'styled-components';

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
  {
    value: 3,
    label: '공모전',
  },
  {
    value: 4,
    label: '프로젝트',
  },
  {
    value: 5,
    label: '직장인',
  },
  {
    value: 6,
    label: '프리랜서',
  },
];

const TagInput = ({ onChange, width, value }: Props) => {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<Tag>>(defaultTags);

  const handleInputChange = useCallback((query: string, { action }: InputActionMeta) => {
    if (action === 'input-change') {
      setOpenMenu(true);
    }
  }, []);

  const hideMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const CustomMenu = useCallback(({ innerProps, ...props }: MenuProps<any>) => {
    return (
      <components.Menu {...props} innerProps={{ ...innerProps }}>
        <PopularTagText>인기 태그</PopularTagText>
        {props.children}
      </components.Menu>
    );
  }, []);

  return (
    <Select
      value={value}
      onInputChange={handleInputChange}
      onChange={onChange}
      onBlur={hideMenu}
      options={tags.map((tag) => ({ ...tag, label: `#${tag.label}` }))}
      isMulti
      placeholder={'태그를 입력하세요 (최대 4개)'}
      menuIsOpen={openMenu}
      components={{ Menu: CustomMenu }}
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
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }),
        menuList: (defaultStyles) => ({
          ...defaultStyles,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gridGap: '20px',
        }),
        option: (defaultStyles) => ({
          ...defaultStyles,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          height: '35px',
          background: '#F2F3F9',
          borderRadius: '50px',

          ':hover': {
            cursor: 'pointer',
            backgroundColor: theme.colors.sub3,
          },
        }),
      }}
    />
  );
};

const PopularTagText = styled.div`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.main};

  height: 30px;
  margin-bottom: 10px;
`;

export default React.memo(TagInput);
