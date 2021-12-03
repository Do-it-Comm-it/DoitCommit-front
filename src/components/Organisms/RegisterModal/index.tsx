import DIButton from '@src/components/Atoms/DIButton';
import DILabel from '@src/components/Atoms/DILabel';
import DIText from '@src/components/Atoms/DIText';
import DropDown from '@src/components/Molecules/DropDown';
import UserProfile from '@src/components/Molecules/UserProfile';
import { userAtom } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';
import React, { useState, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import DIInput from '../../Atoms/DIInput';
import Modal from '../Modal';

type RegisterModalProps = {
  onFinish: () => void;
};

//TODO:
//1. Check user nickname is already taken or not.
//2. Upload Profile Image.
//3. techList is hardcoded, it should go in DB i think.
const RegisterModal = ({ onFinish }: RegisterModalProps) => {
  const [page, setPage] = useState<number>(0);
  const [user, setUser] = useRecoilState(userAtom);
  const [name, setName] = useState<string | null>(user?.nickname ?? null);
  const [techList, setTechList] = useState<string[]>([]);
  const [image, setImage] = useState<string>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onUpload = useCallback(() => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }, [hiddenFileInput]);
  const onFileChange = useCallback((event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setImage(fileUploaded);
    //set file upload here
  }, []);

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  return (
    <Modal>
      <Container>
        {page === 0 && (
          <CardStyle>
            <CardHeader>
              <DIText fontColor={'#AACD06'} fontSize={22} fontWeight={700}>
                두잇커밋에 처음 오셧군요!
              </DIText>
              <DIText>우선, 앞으로 사용하실 닉네임을 정해주세요.</DIText>
            </CardHeader>
            <CardContent>
              <InputPlace>
                <InputText>닉네임</InputText>
                <DIInput defaultValue={name ?? ''} width={200} onChange={onChangeName} />
              </InputPlace>
            </CardContent>
            <CardBottom>
              <DIButton
                value={'다음'}
                onClick={() => {
                  setUser({ ...(user as IUser), nickname: name });
                  onChangePage(1);
                }}
              />
            </CardBottom>
          </CardStyle>
        )}
        {page === 1 && (
          <CardStyle>
            <CardHeader>
              <DIText fontColor={'#AACD06'} fontSize={22}>
                반갑습니다. {user?.nickname} 님
              </DIText>
              <DIText>사용중인 기술이나 관심있는 태그를 설정해주세요.</DIText>
            </CardHeader>
            <CardContent>
              <DropDown
                items={[
                  'javascript',
                  'java',
                  'typescript',
                  'react',
                  'spring',
                  'c/c++',
                  'angular',
                  'vue',
                  'next',
                  'nuxt',
                  'cloud',
                  'CI/CD',
                  'testing',
                  'flutter',
                  'kotlin',
                  'android',
                  'ios',
                  'c#',
                  'rust',
                  'nest',
                  'R',
                  'python',
                  'AI',
                ]}
                onSelect={(select) => {
                  setTechList([...techList, select].filter((value, index, array) => array.indexOf(value) === index));
                }}
              />

              <TechList>
                {techList.length > 0 &&
                  techList.map((tech) => (
                    <DILabel
                      key={tech}
                      onDelete={() => {
                        setTechList([...techList.filter((t) => t !== tech)]);
                      }}
                    >
                      {tech}
                    </DILabel>
                  ))}
              </TechList>
            </CardContent>
            <CardBottom>
              <DIButton
                value={'다음'}
                onClick={() => {
                  onChangePage(2);
                }}
              />
            </CardBottom>
          </CardStyle>
        )}
        {page === 2 && (
          <CardStyle>
            <DIText fontColor={'#AACD06'} fontSize={22}>
              이제. {user?.nickname} 님만의 {<br />}프로필 이미지를 설정해주세요!
            </DIText>
            <DIText>미 업로드 시, 기본 프로필 이미지로 설정됩니다.</DIText>
            <CardContent>
              <UserProfile user={user} width={120} height={120} />
            </CardContent>
            <DIButton
              width={90}
              height={30}
              onClick={() => {
                onUpload();
              }}
            >
              <FileInput ref={hiddenFileInput} onChange={onFileChange} type="file" style={{ display: 'none' }} />
              업로드
            </DIButton>
            <CardBottom>
              <DIButton
                value={'가입완료'}
                onClick={() => {
                  onChangePage(3);
                }}
              />
            </CardBottom>
          </CardStyle>
        )}
        {page === 3 && (
          <CardStyle>
            <DIText fontColor={'#AACD06'} fontSize={40}>
              DOitCOMMIT
            </DIText>
            <DIText>축하드려요! 가입되셨습니다!</DIText>
            <DIText>앞으로 {user?.nickname} 님의 멋진 활동 응원할게요!</DIText>

            <CardBottom>
              <DIButton value={'시작하기'} onClick={onFinish} />
            </CardBottom>
          </CardStyle>
        )}
      </Container>
    </Modal>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const CardBottom = styled.div`
  display: flex;
  padding-bottom: 30px;
  margin-top: auto;
`;
const InputPlace = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;
const InputText = styled(DIText)`
  margin-right: 10px;
`;
const TechList = styled.div`
  overflow-y: auto;
  width: 80%;
  height: 200px;
  border-radius: 20px;

  &::-webkit-scrollbar {
    left: 5px;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.sub};
    left: 5px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 6px;
  }
`;
const FileInput = styled.input`
  padding-top: 30px;
`;
export default RegisterModal;
