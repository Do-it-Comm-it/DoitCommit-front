import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
type Props = {
  children: React.ReactChild;
  count?: number;
};

const LoadingSkeleton = () => {
  return <Skeleton style={{ width: '100%', height: '100%' }} />;
};

const Suspense = ({ children, count = 3 }: Props) => {
  return (
    <React.Suspense
      fallback={
        <Skeleton style={{ width: '100%', height: '100%' }} count={count} />
      }
    >
      {children}
    </React.Suspense>
  );
};

const defaults = {
  LoadingSkeleton,
  Suspense,
};

export default defaults;
