import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 20px 35px;
`;

export const ContentCol = styled.div<{
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  padding?: string;
  heightFull?: boolean;
  widthFull?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ widthFull }) => widthFull && '100%'};
  height: ${({ heightFull }) => heightFull && '100%'};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
`;

export const ContentRow = styled.div<{
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  padding?: string;
  heightFull?: boolean;
  widthFull?: boolean;
}>`
  display: flex;
  flex-direction: row;
  width: ${({ widthFull }) => widthFull && '100%'};
  height: ${({ heightFull }) => heightFull && '100%'};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
`;
