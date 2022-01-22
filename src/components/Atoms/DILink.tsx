import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface Props {
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  to: string;
  style?: React.CSSProperties;
}
const DILink: React.FC<Props> = ({ children, fontColor = '#000', fontWeight = 500, fontSize = 28, to, style }) => {
  return (
    <StyledLink
      to={to}
      fontColor={fontColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      style={style}
      exact
      activeStyle={{
        color: '#18171c',
      }}
    >
      {children}
    </StyledLink>
  );
};

export default DILink;

const StyledLink = styled(NavLink)<{ fontSize: number; fontWeight: number; fontColor: string }>`
  text-decoration: none;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
  white-space: nowrap;
`;
