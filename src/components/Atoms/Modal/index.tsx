import styled from 'styled-components';
import CloseButton from '@src/assets/close_button.svg';
import { devices } from '@src/utils/theme';

export const CreateModal = styled.div<{ width?: string; height?: string }>`
  display: flex;
  align-items: center;
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);

  & > div {
    display: flex;
    flex-direction: column;
    opacity: 1 !important;
    margin: 0 auto;
    width: ${({ width }) => width ?? '600px'};
    @media ${devices.tablet} {
      width: 80%;
    }
    height: ${({ height }) => height ?? '440px'};
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    border-radius: 5px;
    user-select: none;
    z-index: 1012;
  }
`;

export const CloseModalButton = styled(CloseButton)`
  position: absolute;
  right: 0%;
  bottom: 34rem;
  cursor: pointer;
`;

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
