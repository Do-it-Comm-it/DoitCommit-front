import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

type Menus = {
  link?: string;
  name: string;
  color: string;
};

const Footer = () => {
  const theme = useTheme();

  const MenuItem: Array<Menus> = useMemo(() => {
    // theme.colors.white;
    //#ffffff
    return [
      { name: '이용약관', color: '#ffffff' },
      { name: '개인정보처리방침', color: '#ffffff' },
      { name: '제휴/투자문의', color: theme.colors.primary.light100 },
      { name: '기타문의', color: '#ffffff' },
    ];
  }, [theme]);

  return (
    <Container>
      <FooterTitle>두잇커밋</FooterTitle>
      <FooterMenu>
        {MenuItem.map((item, index) => (
          <Item color={item.color} key={index}>
            {item.name}
          </Item>
        ))}
      </FooterMenu>

      <CopyRightText>Copyright © 2022 Doitcommit, All rights reserved.</CopyRightText>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  margin-top: auto;
  display: absolute;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  height: 260px;
  padding: 50px 130px;
  background-color: ${({ theme }) => theme.colors.gray.gray900};
`;

const FooterTitle = styled.div`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 41px;

  color: ${({ theme }) => '#ffffff'};
`;

const FooterMenu = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  gap: 10px;
`;

const Item = styled.div<{ color: string }>`
  display: flex;
  padding-left: 10px;

  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: ${({ color }) => color};

  &:first-child {
    border: none;
    padding-left: 0px;
  }

  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: ${({ theme }) => theme.colors.white};
`;

const CopyRightText = styled.div`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  margin-top: 50px;
  /* Gray/Gray400 */

  color: ${({ theme }) => theme.colors.gray.gray400};
`;
