import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface Props {
  children?: React.ReactElement | React.ReactElement[] | string;
  fontSize?: number;
  fontWeight?: number;
  to: string;
  style?: React.CSSProperties;
  active?: boolean;
}
const DILink = ({
  children,
  fontWeight = 500,
  fontSize = 28,
  to,
  style,
}: Props) => {
  return (
    <StyledLink
      to={to}
      fontSize={fontSize}
      fontWeight={fontWeight}
      style={style}
    >
      {children}
    </StyledLink>
  );
};

export default DILink;

const StyledLink = styled(NavLink)<{
  fontSize?: number;
  fontWeight?: number;
  active?: boolean;
}>`
  text-decoration: none;
  font-size: ${({ fontSize }) => fontSize || 16}px;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.gray.gray950};
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  line-height: 140%;

  &.active {
    color: ${({ theme }) => theme.colors.primary.default};
    position: relative;
    top: 1px;

    border-bottom: ${({ theme }) =>
      `1px solid ${theme.colors.primary.default}`};
  }
`;
