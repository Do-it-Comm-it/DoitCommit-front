import React from 'react';
import 'quill/dist/quill.snow.css';

type Props = {
  width?: number;
  height?: number;
};

const Editor = ({ width, height }: Props) => {
  return (
    <div
      id="editor"
      style={{ width, height }}
      onChange={() => {
        console.log('test');
      }}
    />
  );
};

export default React.memo(Editor);
