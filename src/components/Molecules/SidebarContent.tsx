import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { sidebarItem, sidebarItemBottom } from '@src/data/sidebarData';
const SidebarContent = () => {
  return (
    <SidebarItemWrapper>
      <SidebarUl>
        <div>
          {sidebarItem.map((item, index) => (
            <li key={index}>
              <SidebarLink to="#">
                {item.icon}
                <span>{item.title}</span>
              </SidebarLink>
            </li>
          ))}
        </div>
        <div>
          {sidebarItemBottom.map((item, index) => (
            <li key={index}>
              <SidebarLink to="#">
                {item.icon}
                <span>{item.title}</span>
              </SidebarLink>
            </li>
          ))}
        </div>
      </SidebarUl>
    </SidebarItemWrapper>
  );
};

const SidebarItemWrapper = styled.div`
  width: 308px;

  & > li {
    padding: 0px;
    margin-right: 32px;
    list-style: none;
  }
`;

const SidebarUl = styled.ul`
  list-style: none;
  padding: 0px;

  & > div {
    margin-bottom: 100px;
  }
`;

const SidebarLink = styled(Link)`
  width: 100%;
  padding: 18px 18px 18px 32px;
  font-size: 16px;
  line-height: 23px;
  display: block;
  color: #ffffff;
  text-decoration: none;
  & > svg {
    vertical-align: middle;
    padding-bottom: 3px;
    margin-right: 30px;
  }
  &:hover {
    background-color: #aacd06;
  }
`;
export default SidebarContent;
