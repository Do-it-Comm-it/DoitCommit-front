import styled from 'styled-components';

export const CreateModal = styled.div`
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
    opacity: 1 !important;
    margin-top: 200px;
    display: inline-block;
    width: 494px;
    height: 539px;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    border-radius: 6px;
    user-select: none;
    z-index: 1012;
    position: relative;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
