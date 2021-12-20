import { useAuthentication } from '@src/hooks/useAuthentication';
import React, { useState, useCallback } from 'react';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';

const ProfileInfoArea = () => {
  const { user } = useAuthentication();
  const theme = useTheme();
  const [info, setInfo] = useState({
    nickname: user?.nickname as string,
    email: user?.email as string,
    address: '',
    facebook: '',
    github: '',
    position: '',
    url: '',
  });
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
      console.log(name + ' : ' + value);
    },
    [info],
  );
  return (
    // TODO: set default value(from user data) to INPUT ELEMENT
    <Container>
      <ul>
        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            이름
          </DIText>
          <input name="nickname" type="text" onChange={handleChange} defaultValue={info.nickname} />
        </li>

        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            이메일
          </DIText>
          <input name="email" type="text" onChange={handleChange} defaultValue={info.email} />
        </li>

        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            직군
          </DIText>
          <input name="position" type="text" onChange={handleChange} />
        </li>

        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            주소
          </DIText>
          <input name="address" type="text" onChange={handleChange} />
        </li>
      </ul>

      <ul>
        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            페이스북
          </DIText>
          <input name="facebook" type="text" onChange={handleChange} />
        </li>
        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            깃허브
          </DIText>
          <input name="github" type="text" onChange={handleChange} />
        </li>
        <li>
          <DIText fontFamily={theme.font.NotoSansKRRegular} fontSize={20} fontWeight={700}>
            URL
          </DIText>
          <input name="url" type="text" onChange={handleChange} />
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  justify-content: space-evenly;
  width: 70%;
  display: flex;
  padding-top: 40px;

  & > ul {
    font-size: 20px;

    & > li {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 350px;

      & > input {
        height: 37px;
        border: 0 none;
        background-color: #eeeeee;
        border-radius: 5px;
        padding: 6px 13px;
        width: 250px;
        outline: none;

        &:focus {
          box-shadow: 0px 0px 4px #aacd06;
          background: #ffffff;
          border: 1px solid #aacd06;
        }
      }
    }
  }
`;
export default ProfileInfoArea;
