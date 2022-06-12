import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { sidebarItem } from '@src/data/sidebarData';
import { useUser } from '@src/hooks/useAuthentication';
import { useRecoilState } from 'recoil';
import { searchAtom } from '@src/recoil/atom/search';

type Props = {
  onClose: () => void;
};

const SidebarContent = ({ onClose }: Props) => {
  const { data: user } = useUser();
  const setSearch = useRecoilState(searchAtom)[1];

  return (
    <Container>
      <SidebarUl>
        <div>
          {sidebarItem.map((item, index) => (
            <li key={index}>
              <SidebarLink
                to={!user && item.needLogin ? '#' : item.path}
                onClick={
                  !user && item.needLogin
                    ? () => {
                        alert('로그인이 필요합니다.');
                      }
                    : () => {
                        setSearch((prev) => ({ ...prev, complete: false }));
                        onClose();
                      }
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarLink>
            </li>
          ))}
        </div>
      </SidebarUl>
    </Container>
  );
};

const Container = styled.div`
  width: 308px;
`;

const SidebarUl = styled.ul`
  list-style: none;
  padding: 0px;

  & > div {
    & > li {
      :nth-child(4) {
        margin-bottom: 15px;
        ::after {
          content: '';
          position: absolute;
          width: 80%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 1px solid #66727a;
        }
      }
    }
  }
`;

const SidebarLink = styled(Link)`
  width: 100%;
  padding: 18px 18px 18px 32px;
  font-size: 16px;
  height: 100%;
  display: block;
  color: #ffffff;
  text-decoration: none;
  & > svg {
    vertical-align: middle;
    padding-bottom: 3px;
    margin-right: 30px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.default};
  }
`;
export default React.memo(SidebarContent);
