import { userAtom } from '@src/recoil/atom/user';
import { resignUser } from '@src/service/api';
import { signOut } from '@src/service/firebase';
import { IUser } from '@src/typings/User';
import React from 'react';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

const Documents = () => {
  const user = useRecoilValue(userAtom);
  const onResign = useCallback(() => {
    resignUser(user as IUser).then((res) => {
      if (res.deleted) {
        alert('회원 탈퇴 성공');
        signOut();
      }
    });
  }, [user]);
  return (
    <div>
      <h2>Documents</h2>
      <button onClick={onResign}>회원탈퇴</button>
    </div>
  );
};

export default Documents;
