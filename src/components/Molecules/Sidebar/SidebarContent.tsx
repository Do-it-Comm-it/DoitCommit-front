import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { sidebarItem } from '@src/data/sidebarData';

type Props = {
  onClose: () => void;
};

const SidebarContent = ({ onClose }: Props) => {
  return (
    <Container>
      <SidebarUl>
        <div>
          {sidebarItem.map((item, index) => (
            <li key={index}>
              <SidebarLink to={item.path} onClick={onClose}>
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
      :nth-child(5) {
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
    background-color: ${({ theme }) => theme.colors.main};
  }
`;
export default React.memo(SidebarContent);
