import { useUser } from '@src/hooks/useAuthentication';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { data: user } = useUser();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }
  }, [user]);

  if (user) {
    return props.children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
