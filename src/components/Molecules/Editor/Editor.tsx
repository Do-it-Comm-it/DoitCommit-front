import React from 'react';
import { useTheme } from 'styled-components';

type Props = {
  width?: number;
  height?: number;
};

const Editor = ({ width, height }: Props) => {
  const theme = useTheme();
  return (
    <div id="editor" style={{ width, height, color: theme.colors.black }} />
  );
};

export default React.memo(Editor);
