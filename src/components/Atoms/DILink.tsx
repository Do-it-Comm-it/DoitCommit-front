import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface Props {
  fontSize?: number;
  fontWeight?: number;
  to: string;
  style?: React.CSSProperties;
}
const DILink: React.FC<Props> = ({ children, fontWeight = 500, fontSize = 28, to, style }) => {
  return (
    <StyledLink to={to} fontSize={fontSize} fontWeight={fontWeight} style={style}>
      {children}
    </StyledLink>
  );
};

export default DILink;

const StyledLink = styled(NavLink)<{ fontSize?: number; fontWeight?: number }>`
  text-decoration: none;
  font-size: ${({ fontSize }) => fontSize || 16}px;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  color: ${({ theme }) => theme.colors.gray.gray950};
  white-space: nowrap;
`;
