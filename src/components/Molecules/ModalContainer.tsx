import React from 'react';
import { CreateModal } from '../Atoms/Modal';

interface Props {
  width?: string;
  height?: string;
  onClose: () => void;
  stopPropagation: (e: any) => void;
}
const ModalContainer: React.FC<Props> = ({ width, height, onClose, stopPropagation, children }) => {
  return (
    <CreateModal onClick={onClose} width={width} height={height}>
      <div onClick={stopPropagation}>{children}</div>
    </CreateModal>
  );
};

export default ModalContainer;
