import styled from 'styled-components';
import CloseButton from '@src/assets/close_button.svg';
export const CreateModal = styled.div`
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
    width: 600px;
    height: 440px;
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
