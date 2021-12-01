import { IUser } from '@src/typings/User';
import React from 'react';
import styled from 'styled-components';

type UserProfileProps = {
  width?: number;
  height?: number;
  user: IUser | null;
};

//TODO: It needs profile default image if user image is empty.
//it could be expanded anyway.
const UserProfile = ({ width = 40, height = 40, user }: UserProfileProps) => {
  return (
    <Circle width={width} height={height}>
      {user && <img src={user.image ?? ''} width={width} height={height} alt={'connection error'} />}
    </Circle>
  );
};

export default UserProfile;

const Circle = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
