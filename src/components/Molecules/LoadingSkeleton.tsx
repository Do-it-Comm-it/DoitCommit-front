import React from 'react';

import Skeleton from 'react-loading-skeleton';
type Props = {
  children: React.ReactChild;
  count?: number;
};

const LoadingSkeleton = () => {
  return <Skeleton />;
};

const Suspense = ({ children, count = 3 }: Props) => {
  return (
    <React.Suspense fallback={<Skeleton count={count} />}>
      {children}
    </React.Suspense>
  );
};

const defaults = {
  LoadingSkeleton,
  Suspense,
};

export default defaults;
