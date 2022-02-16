import React from 'react';
import { CreateModal } from '../Atoms/Modal';

interface Props {
  width?: number;
  height?: number;
  onClose: () => void;
  stopPropagation: (e: any) => void;
  backgroundColor?: string;
}
const ModalContainer: React.FC<Props> = ({ width, height, onClose, stopPropagation, children, backgroundColor }) => {
  return (
    <CreateModal onClick={onClose} width={width} height={height} backgroundColor={backgroundColor}>
      <div onClick={stopPropagation}>{children}</div>
    </CreateModal>
  );
};

export default ModalContainer;
