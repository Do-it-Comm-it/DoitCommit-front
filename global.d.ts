declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
