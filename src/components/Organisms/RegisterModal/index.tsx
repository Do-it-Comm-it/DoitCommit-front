import DIButton from '@src/components/Atoms/DIButton';
import DIText from '@src/components/Atoms/DIText';
import UserProfile from '@src/components/Molecules/UserProfile';
import { userAtom } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';
import CloseIcon from '@src/assets/close_button.svg';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled, { useTheme } from 'styled-components';
import DIInput from '../../Atoms/DIInput';
import Divider from '@src/components/Atoms/Divider';
import { AiOutlineCheck, AiOutlineLeft } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';
import Select from 'react-select';
import { MdCheck, MdEdit } from 'react-icons/md';

type RegisterModalProps = {
  onFinish: () => void;
};

type Tech = {
  value: string;
  label: string;
};
const options = [
  { value: 'javascript', label: 'javascript' },
  { value: 'java', label: 'java' },
  { value: 'typescript', label: 'typescript' },
  { value: 'react', label: 'react' },
  { value: 'spring', label: 'spring' },
  { value: 'c/c++', label: 'c/c++' },
  { value: 'angular', label: 'angular' },
  { value: 'vue', label: 'vue' },
  { value: 'next', label: 'next' },
  { value: 'nuxt', label: 'nuxt' },
  { value: 'cloud', label: 'cloud' },
  { value: 'CI/CD', label: 'CI/CD' },
  { value: 'testing', label: 'testing' },
  { value: 'flutter', label: 'flutter' },
  { value: 'kotlin', label: 'kotlin' },
  { value: 'android', label: 'android' },
  { value: 'ios', label: 'ios' },
  { value: 'c#', label: 'c#' },
  { value: 'rust', label: 'rust' },
  { value: 'nest', label: 'nest' },
  { value: 'R', label: 'R' },
  { value: 'python', label: 'python' },
  { value: 'AI', label: 'AI' },
];

//TODO:
//1. Check user nickname is already taken or not.
//2. Upload Profile Image.
//3. techList is hardcoded, it should go in DB i think.
const RegisterModal = ({ onFinish }: RegisterModalProps) => {
  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [user, setUser] = useRecoilState(userAtom);
  const [name, setName] = useState<string | null>(null);
  const [techList, setTechList] = useState<Tech[]>([]);
  // const [image, setImage] = useState<string>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [checkName, setCheckName] = useState<boolean>(false);

  const onUpload = useCallback(() => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }, [hiddenFileInput]);
  const onFileChange = useCallback((event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    // setImage(fileUploaded);
    //set file upload here
  }, []);

  useEffect(() => {
    if (true) {
      setCheckName(true);
    }
  }, []);

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  const NickNameContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle style={{ paddingBottom: 14 }} fontSize={28} fontFamily={theme.font.NotoSansKRBold}>
            두잇커밋에 처음 오셧군요?
          </HeaderTitle>
          <HeaderDescription fontSize={16} fontFamily={theme.font.NotoSansKRLight}>
            앞으로 사용하실 닉네임을 정해주세요.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <InputPlace>
            <DIInput
              defaultValue={name ?? ''}
              width={285}
              height={65}
              onChange={onChangeName}
              placholder={'최대 6글자'}
            />
          </InputPlace>
          {checkName ? (
            <DIText fontColor={theme.colors.main}>
              <AiOutlineCheck />
              사용가능한 닉네임입니다.
            </DIText>
          ) : (
            <DIText fontColor={theme.colors.warning}>
              <RiErrorWarningLine />
              이미 사용중인 닉네임입니다.
            </DIText>
          )}
        </CardContent>
        <CardBottom>
          <DIButton
            disabled={name === null || name.trim().length === 0}
            value={'다음'}
            onClick={() => {
              setUser({ ...(user as IUser), nickname: name });
              onChangePage(1);
            }}
          />
        </CardBottom>
      </CardStyle>
    );
  }, [checkName, name, onChangeName, onChangePage, setUser, theme, user]);

  const TechContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle style={{ paddingBottom: 14 }} fontSize={28} fontFamily={theme.font.NotoSansKRBold}>
            반갑습니다. {user?.nickname} 님
          </HeaderTitle>
          <HeaderDescription fontSize={16} fontFamily={theme.font.NotoSansKRLight}>
            사용중인 기술이나 관심있는 태그를 설정해주세요.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <TechSelect
            onChange={(value) => {
              setTechList(value as Tech[]);
            }}
            options={options}
            isMulti
            placeholder={'EX) Java, C#, Javascript'}
            styles={{
              input: (defaultStyles) => ({
                ...defaultStyles,
                height: 45,
              }),
              placeholder: (defaultStyles) => ({
                ...defaultStyles,
                color: theme.colors.dark.a2,
              }),
              multiValue: (defaultStyles) => ({
                ...defaultStyles,
                display: 'flex',
                borderRadius: 5,
                backgroundColor: theme.colors.main,
              }),
              multiValueLabel: (defaultStyles) => ({
                ...defaultStyles,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: theme.colors.main,
                color: theme.colors.background,
              }),
              multiValueRemove: (defaultStyles) => ({
                ...defaultStyles,
                display: 'flex',
                alignItems: 'center',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: theme.colors.main,
                color: theme.colors.background,
              }),
            }}
          />
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
    );
  }, [onChangePage, theme, user]);

  const ImageContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle style={{ paddingBottom: 14 }} fontSize={28} fontFamily={theme.font.NotoSansKRBold}>
            프로필 이미지를 설정하세요
          </HeaderTitle>
          <HeaderDescription fontSize={16} fontFamily={theme.font.NotoSansKRLight}>
            미 업로드 시, 기본 프로필 이미지로 설정됩니다.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <ProfileContent>
            <ProfilePicture>
              <UserProfile user={user} width={72} height={72} />
              <EditIcon
                size={24}
                color={theme.colors.background}
                onClick={() => {
                  onUpload();
                }}
                type="file"
              />
            </ProfilePicture>

            <ProfileText>
              <DIText style={{ paddingBottom: 20 }}>{user?.nickname}</DIText>
              <DIText style={{ textDecoration: 'underline' }} fontColor={theme.colors.dark.a3} onClick={() => {}}>
                기본 이미지로 변경
              </DIText>
            </ProfileText>
          </ProfileContent>
        </CardContent>
        <FileInput ref={hiddenFileInput} onChange={onFileChange} type="file" style={{ display: 'none' }} />
        <CardBottom>
          <DIButton
            value={'다음'}
            onClick={() => {
              onChangePage(3);
            }}
          />
        </CardBottom>
      </CardStyle>
    );
  }, [onChangePage, onFileChange, onUpload, theme, user]);

  const FinishContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <MdCheck size={36} color={theme.colors.main} />
        </CardHeader>
        <CardContent>
          <HeaderTitle style={{ paddingBottom: 14 }} fontSize={28} fontFamily={theme.font.NotoSansKRBold}>
            축하드려요! 가입되셨습니다!
          </HeaderTitle>

          <HeaderDescription fontSize={16} fontFamily={theme.font.NotoSansKRLight}>
            앞으로 {user?.nickname} 님의 멋진 활동 응원할게요!
          </HeaderDescription>
        </CardContent>
        <CardBottom>
          <DIButton value={'시작하기'} onClick={onFinish} />
        </CardBottom>
      </CardStyle>
    );
  }, [onFinish, theme, user]);

  return (
    <Container>
      <Header>
        <BackIcon
          color={theme.colors.dark.a3}
          size={24}
          onClick={() => {
            if (page > 0) {
              setPage((prev) => prev - 1);
            }
            if (page === 0) {
              onFinish();
            }
          }}
        />
        <Label>
          {[...Array(4)].map((_, index) => {
            return <PageLabel active={page === index}>{page === index ? index + 1 : ``}</PageLabel>;
          })}
        </Label>
        <CloseModalButton onClick={onFinish} />
        <Divider />
      </Header>
      {page === 0 && NickNameContent()}
      {page === 1 && TechContent()}
      {page === 2 && ImageContent()}
      {page === 3 && FinishContent()}
    </Container>
  );
};

const Container = styled.div`
  height: 300px;
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
  justify-content: center;
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
const HeaderTitle = styled(DIText)``;
const HeaderDescription = styled(DIText)``;

const InputPlace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FileInput = styled.input`
  padding-top: 30px;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const CloseModalButton = styled(CloseIcon)`
  width: 25px;
  position: absolute;
  top: -20px;
  right: 20px;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
`;

const TechSelect = styled(Select)`
  width: 450px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;

const ProfilePicture = styled.div`
  display: flex;
  position: relative;
`;

const EditIcon = styled(MdEdit)`
  background-color: ${({ theme }) => theme.colors.dark.a3};
  border-radius: 40px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  bottom: 0;
  right: -5px;

  &:hover {
    cursor: pointer;
  }
`;
const BackIcon = styled(AiOutlineLeft)`
  position: absolute;
  top: 20px;
  left: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 20px;
`;
const PageLabel = styled.div<{ active: boolean }>`
  margin-right: 5px;
  border-radius: 100px;
  width: ${({ active }) => (active ? 18 : 9)}px;
  height: ${({ active }) => (active ? 18 : 9)}px;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme, active }) => (active ? theme.colors.main : theme.colors.dark.a2)};
`;
export default RegisterModal;
