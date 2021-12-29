import { resignUser } from '@src/service/api';
import { signOut } from '@src/service/firebase';
import React from 'react';
import { useCallback } from 'react';

const Documents = () => {
  const onResign = useCallback(() => {
    resignUser().then((res) => {
      if (res.deleted) {
        alert('회원 탈퇴 성공');
        signOut();
      }
    });
  }, []);
  return (
    <div>
      <h2>Documents</h2>
      <button onClick={onResign}>회원탈퇴</button>
    </div>
  );
};

export default Documents;
