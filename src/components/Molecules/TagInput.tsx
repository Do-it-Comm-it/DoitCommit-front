import { useDebounce } from '@src/hooks/useDebounce';
import useTag from '@src/hooks/useTag';
import { Tag } from '@src/typings/Board';
import React, { useCallback, useMemo, useState } from 'react';
import Select, { InputActionMeta, components, MenuProps, MultiValueProps, InputProps } from 'react-select';
import styled, { useTheme } from 'styled-components';

interface Props {
  onChange: (value: unknown) => void;
  width?: number;
  value: Tag[];
}

const TagInput = ({ onChange, value }: Props) => {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 400);
  const { useTagList, usePopularTag } = useTag();
  const { data: tagList } = useTagList();
  const { data: popularTagList } = usePopularTag();

  const handleInputChange = useCallback((query: string, { action }: InputActionMeta) => {
    if (action === 'input-change') {
      setSearch(query);

      setOpenMenu(true);
    }
  }, []);

  const filteredOption = useMemo(() => {
    if (debouncedSearch) {
      if (debouncedSearch.length === 0 && popularTagList) {
        return popularTagList;
      } else if (debouncedSearch.length > 0 && tagList) {
        return tagList.filter((tag) => tag.tagName.includes(debouncedSearch)).slice(0, 8);
      }
    }
  }, [debouncedSearch, popularTagList, tagList]);

  const hideMenu = useCallback(() => {
    setOpenMenu(false);
    setSearch('');
  }, []);

  const CustomMenu = useCallback(
    ({ innerProps, ...props }: MenuProps<any>) => {
      return (
        <components.Menu {...props} innerProps={{ ...innerProps }}>
          <PopularTagText>{search.length === 0 ? `인기 태그` : `검색 태그`}</PopularTagText>
          {props.children}
        </components.Menu>
      );
    },
    [search],
  );

  return (
    <Select
      value={value}
      onFocus={() => {
        setOpenMenu(true);
      }}
      onInputChange={handleInputChange}
      onChange={onChange}
      onBlur={hideMenu}
      options={
        filteredOption ? filteredOption.map((tag) => ({ ...tag, value: tag.tagId, label: `#${tag.tagName}` })) : []
      }
      isMulti
      placeholder={'태그를 입력하세요 (최대 4개)'}
      menuIsOpen={openMenu}
      components={{ Menu: CustomMenu }}
      isOptionDisabled={() => value.length >= 4}
      styles={{
        dropdownIndicator: (defaultStyles) => ({
          ...defaultStyles,
          display: 'none',
        }),
        container: (defaultStyles) => ({
          ...defaultStyles,
          width: 500,
        }),
        multiValue: (defaultStyles) => ({
          background: 'none',
          fontSize: '25px',
          lineHeight: '36px',
          color: `${theme.colors.main}`,
          fontFamily: theme.font.NotoSansKRRegular,
          paddingRight: 10,
        }),
        multiValueLabel: (defaultStyles) => ({
          background: 'none',
          fontSize: '25px',
          lineHeight: '36px',
          color: `${theme.colors.main}`,
          fontFamily: theme.font.NotoSansKRRegular,
        }),
        control: (defaultStyles, { isFocused }) => ({
          ...defaultStyles,
          border: 'none',
          width: 500,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }),
        multiValueRemove: () => ({
          display: 'none',
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
