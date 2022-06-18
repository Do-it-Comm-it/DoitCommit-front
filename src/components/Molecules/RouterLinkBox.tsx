import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import styled from 'styled-components';
import DILink from '../Atoms/DILink';

type Props = {
  to: string;
};
const RouterLinkBox = ({ to }: Props) => {
  return (
    <DILink to={to}>
      <PlusIcon size={16} />
    </DILink>
  );
};

const PlusIcon = styled(HiOutlinePlus)`
  color: ${({ theme }) => theme.colors.gray.gray950};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default RouterLinkBox;
