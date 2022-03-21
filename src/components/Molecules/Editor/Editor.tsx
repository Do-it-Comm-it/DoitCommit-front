import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

const Editor = ({ width, height }: Props) => {
  return <div id="editor" style={{ width, height }} />;
};

export default React.memo(Editor);
