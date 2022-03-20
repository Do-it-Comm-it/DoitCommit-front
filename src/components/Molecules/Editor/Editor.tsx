import React from 'react';
import 'quill/dist/quill.bubble.css';

type Props = {
  width?: number;
  height?: number;
};

const Editor = ({ width, height }: Props) => {
  return <div id="editor" style={{ width, height }} />;
};

export default React.memo(Editor);
