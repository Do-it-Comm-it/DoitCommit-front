import React, { MouseEvent, useCallback, useState } from 'react';
import { CreateModal } from '../Atoms/Modal';

interface Props {
  width?: number;
  height?: number;
  onClose: () => void;
  stopPropagation: (e: any) => void;
  backgroundColor?: string;
}
const ModalContainer: React.FC<Props> = ({ width, height, onClose, stopPropagation, children, backgroundColor }) => {
  const [target, setTarget] = useState<EventTarget>();

  const onSaveCurrentTarget = useCallback((event: MouseEvent) => {
    if (event.target) {
      setTarget(event.target);
    }
  }, []);

  return (
    <CreateModal
      onClick={(e) => {
        e.stopPropagation();
        if (target === e.currentTarget) {
          onClose();
        }
      }}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      onMouseDown={onSaveCurrentTarget}
    >
      <div onClick={stopPropagation} onMouseDown={onSaveCurrentTarget} onMouseUp={onSaveCurrentTarget}>
        {children}
      </div>
    </CreateModal>
  );
};

export default ModalContainer;
