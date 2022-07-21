import DIButton from '@src/components/Atoms/DIButton';
import DIText from '@src/components/Atoms/DIText';
import UserProfile from '@src/components/Molecules/UserProfile';
import CloseIcon from '@src/assets/close_button.svg';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled, { useTheme } from 'styled-components';
import DIInput from '../../Atoms/DIInput';
import Divider from '@src/components/Atoms/Divider';
import { AiOutlineCheck, AiOutlineLeft } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';
import SelectInput from '../SelectInput';
import { MdEdit } from 'react-icons/md';
import CheckIcon from '@src/assets/check.svg';
import { user as userAPI } from '@src/service/api';
import ModalContainer from '@src/components/Molecules/ModalContainer';
import { Tech } from '@src/typings/Tech';
import { fileAtom } from '@src/recoil/atom/file';
import { useUser } from '@src/hooks/useAuthentication';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDebounce } from '@src/hooks/useDebounce';

type RegisterModalProps = {
  onFinish: () => void;
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
};

enum NICKNAME_MESSAGE {
  LIMIT = '15글자 이상은 불가능합니다.',
  SPECIAL = '특수문자는 불가능합니다.',
  ALREADY_HAVE = '이미 사용중인 닉네임입니다',
  ENTER = '닉네임을 적어주세요.',
  AVAILABLE = '사용가능한 닉네임입니다.',
}

const SpecialCharacterRegex =
  // eslint-disable-next-line no-useless-escape
  /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

//TODO:
//1. Check user nickname is already taken or not.
//2. Upload Profile Image.
//3. techList is hardcoded, it should go in DB i think.
const RegisterModal = ({
  onFinish,
  onClose,
  stopPropagation,
  width,
  height,
}: RegisterModalProps) => {
  const { data: user } = useUser();
  const theme = useTheme();
  const [placeHolderMessage, setPlaceHolderMessage] = useState<string>(
    NICKNAME_MESSAGE.ENTER
  );
  const [page, setPage] = useState<number>(0);
  const [nickname, setNickname] = useState('');
  const [interestTechSet, setInterestTechSet] = useState<Tech[]>([]);
  const [file, setFile] = useRecoilState(fileAtom);
  const debounceInput = useDebounce(nickname, 200);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { data: check, isLoading } = useQuery(
    ['nicknameCheck', debounceInput],
    () => userAPI.checkNickname(debounceInput as string),
    {
      enabled: user && nickname.trim().length && page === 0 ? true : false,
    }
  );

  const onUpload = useCallback(() => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }, [hiddenFileInput]);
  const onFileChange = useCallback(
    (event) => {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = () => {
        setFile({
          image: file,
          previewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    },
    [setFile]
  );

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const onChangeName = useCallback(
    (text: string) => {
      setNickname(text);
    },
    [setNickname]
  );

  useEffect(() => {
    if (SpecialCharacterRegex.test(nickname)) {
      setPlaceHolderMessage(NICKNAME_MESSAGE.SPECIAL);
    } else if (nickname.length > 15) {
      setPlaceHolderMessage(NICKNAME_MESSAGE.LIMIT);
    } else if (nickname.length === 0) {
      setPlaceHolderMessage(NICKNAME_MESSAGE.ENTER);
    } else if (!check && !isLoading) {
      setPlaceHolderMessage(NICKNAME_MESSAGE.ALREADY_HAVE);
    } else if (check) {
      setPlaceHolderMessage(NICKNAME_MESSAGE.AVAILABLE);
    }
  }, [nickname, check, isLoading]);

  const queryClient = useQueryClient();
  const onCompleteSignUp = useMutation(
    (newInfo: any) => {
      return userAPI.updateUserInfo(user!, {
        ...newInfo,
        imageFile: file.image,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        onFinish();
      },
    }
  );

  const NickNameContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle
            style={{ paddingBottom: 14 }}
            fontSize={25}
            fontFamily={theme.font.NotoSansKRBold}
            fontColor={theme.colors.gray.gray950}
          >
            두잇커밋에 처음 오셨군요?
          </HeaderTitle>
          <HeaderDescription
            fontSize={16}
            fontFamily={theme.font.NotoSansKRRegular}
            fontColor={theme.colors.gray.gray700}
          >
            앞으로 사용하실 닉네임을 정해주세요.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <InputPlace>
            <DIInput
              backgroundColor={theme.colors.white}
              fontColor={theme.colors.gray.gray950}
              defaultValue={nickname ?? ''}
              width={285}
              height={65}
              onChange={onChangeName}
              maxLength={15}
              placeholder={'최대 15글자'}
            />
          </InputPlace>

          <DIText
            fontColor={
              placeHolderMessage === NICKNAME_MESSAGE.AVAILABLE
                ? theme.colors.primary.default
                : theme.colors.warning
            }
            style={{ paddingTop: 13 }}
          >
            {placeHolderMessage === NICKNAME_MESSAGE.AVAILABLE ? (
              <AiOutlineCheck />
            ) : (
              <RiErrorWarningLine />
            )}
            {placeHolderMessage}
          </DIText>
        </CardContent>
        <CardBottom>
          <DIButton
            borderRadius={60}
            backgroundColor={theme.colors.primary.default}
            disabled={
              !check || nickname.trim().length === 0 || nickname.length > 15
            }
            value={'다음'}
            onClick={() => {
              onChangePage(1);
            }}
          />
        </CardBottom>
      </CardStyle>
    );
  }, [nickname, placeHolderMessage, onChangeName, onChangePage, theme, check]);

  const TechContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle
            style={{ paddingBottom: 14 }}
            fontSize={28}
            fontFamily={theme.font.NotoSansKRBold}
            fontColor={theme.colors.gray.gray700}
          >
            반갑습니다. {nickname} 님!
          </HeaderTitle>
          <HeaderDescription
            fontSize={16}
            fontFamily={theme.font.NotoSansKRLight}
            fontColor={theme.colors.gray.gray700}
          >
            사용 중인 기술이나 관심있는 기술 태그를 선택해주세요.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <SelectInput
            onChange={(value) => setInterestTechSet(value as Tech[])}
          />
        </CardContent>
        <CardBottom>
          <DIButton
            borderRadius={60}
            backgroundColor={theme.colors.primary.default}
            value={'다음'}
            onClick={() => {
              onChangePage(2);
            }}
          />
        </CardBottom>
      </CardStyle>
    );
  }, [onChangePage, theme, setInterestTechSet, nickname]);

  const ImageContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <HeaderTitle
            style={{ paddingBottom: 14 }}
            fontSize={28}
            fontFamily={theme.font.NotoSansKRBold}
            fontColor={theme.colors.gray.gray700}
          >
            프로필 이미지를 설정하세요
          </HeaderTitle>
          <HeaderDescription
            fontSize={16}
            fontFamily={theme.font.NotoSansKRLight}
            fontColor={theme.colors.gray.gray700}
          >
            미 업로드 시, 기본 프로필 이미지로 설정됩니다.
          </HeaderDescription>
        </CardHeader>
        <CardContent>
          <ProfileContent>
            <ProfilePicture>
              <UserProfile
                user={user!}
                src={file.previewUrl}
                width={72}
                height={72}
              />
              <EditIcon
                size={24}
                color={theme.colors.gray.gray100}
                onClick={() => {
                  onUpload();
                }}
                type="file"
              />
            </ProfilePicture>

            <ProfileText>
              <DIText style={{ paddingBottom: 20 }}>{user?.nickname}</DIText>
              <DIText
                style={{ textDecoration: 'underline' }}
                fontColor={theme.colors.gray.gray400}
                onClick={() => {}}
              >
                기본 이미지로 변경
              </DIText>
            </ProfileText>
          </ProfileContent>
        </CardContent>
        <FileInput
          ref={hiddenFileInput}
          onChange={onFileChange}
          type="file"
          style={{ display: 'none' }}
        />
        <CardBottom>
          <DIButton
            borderRadius={60}
            backgroundColor={theme.colors.primary.default}
            value={'다음'}
            onClick={() => {
              onChangePage(3);
            }}
          />
        </CardBottom>
      </CardStyle>
    );
  }, [onChangePage, onFileChange, onUpload, theme, user, file]);

  const FinishContent = useCallback(() => {
    return (
      <CardStyle>
        <CardHeader>
          <CheckIcon />
        </CardHeader>
        <CardContent>
          <HeaderTitle
            style={{ paddingBottom: 14 }}
            fontSize={28}
            fontFamily={theme.font.NotoSansKRBold}
            fontColor={theme.colors.gray.gray950}
          >
            축하드려요! 가입되셨습니다!
          </HeaderTitle>

          <HeaderDescription
            fontSize={16}
            fontFamily={theme.font.NotoSansKRLight}
            fontColor={theme.colors.gray.gray700}
          >
            앞으로 {user?.nickname} 님의 멋진 활동 응원할게요!
          </HeaderDescription>
        </CardContent>
        <CardBottom>
          <DIButton
            borderRadius={60}
            backgroundColor={theme.colors.primary.default}
            value={'시작하기'}
            onClick={() =>
              onCompleteSignUp.mutate({
                nickname,
                interestTechSet,
                file,
              })
            }
          />
        </CardBottom>
      </CardStyle>
    );
  }, [onCompleteSignUp, theme, user, file, interestTechSet, nickname]);

  return (
    <ModalContainer
      width={width}
      height={height}
      onClose={onClose}
      stopPropagation={stopPropagation}
    >
      <Container>
        <Header>
          {page !== 0 && (
            <BackIcon
              color={theme.colors.gray.gray400}
              size={24}
              onClick={() => {
                setPage((prev) => prev - 1);
              }}
            />
          )}
          <Label>
            {[...Array(4)].map((_, index) => {
              return (
                <PageLabel key={index} active={page === index}>
                  {page === index ? index + 1 : ``}
                </PageLabel>
              );
            })}
          </Label>
          <CloseModalButton onClick={onFinish} />
        </Header>
        <Divider />

        {page === 0 && NickNameContent()}
        {page === 1 && TechContent()}
        {page === 2 && ImageContent()}
        {page === 3 && FinishContent()}
      </Container>
    </ModalContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 30px;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CardContent = styled.div`
  padding-top: 27px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const CardBottom = styled.div`
  display: flex;
  padding-bottom: 52px;
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
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const CloseModalButton = styled(CloseIcon)`
  width: 25px;
  margin-left: auto;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.gray950};
  cursor: pointer;
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
  background-color: ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 40px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray.gray100};
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
  margin-left: auto;
`;
const PageLabel = styled.div<{ active: boolean }>`
  margin-right: 5px;
  border-radius: 100px;
  width: ${({ active }) => (active ? 18 : 9)}px;
  height: ${({ active }) => (active ? 18 : 9)}px;
  color: #ffffff;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary.default : theme.colors.gray.gray300};
`;
export default RegisterModal;
