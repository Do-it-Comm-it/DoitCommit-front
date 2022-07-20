import DIButton from '@src/components/Atoms/DIButton';
import { Content, Label } from '@src/components/Atoms/Mypage';
import SelectInput from '@src/components/Organisms/SelectInput';
import infoFormData from '@src/data/formData';
import { useUser } from '@src/hooks/useAuthentication';
import { fileAtom } from '@src/recoil/atom/file';
import { user as userAPI } from '@src/service/api';
import { Tech } from '@src/typings/Tech';
import { IUser } from '@src/typings/User';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';
import AddInput from './AddInput';
import Form from './Form';

const ProfileInfoArea = () => {
  const { data: user, status } = useUser();
  const theme = useTheme();
  const [formData, setFormData] =
    useState<{ name: string; label: string }[]>(infoFormData);
  const queryClient = useQueryClient();
  const file = useRecoilValue(fileAtom);
  const [input, setInput] = useState<IUser>({
    ...user!,
  });

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );
  const addForm = useCallback(() => {
    setFormData([
      ...formData,
      {
        label: 'url2',
        name: 'url2',
      },
    ]);
  }, [formData]);

  const onSubmit = useMutation(
    (newInfo: any) => {
      return userAPI.updateUserInfo(user!, {
        ...newInfo,
        imageFile: file.image,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
  useEffect(() => {
    if (status === 'success') {
      setInput({ ...user! });
    }
  }, [status, user]);

  return (
    <>
      {user && (
        <Container>
          {formData.map((item, i) => (
            <Form
              name={item.name}
              label={item.label}
              key={i}
              user={user!}
              onChangeInput={onChangeInput}
            />
          ))}
          <Content>
            <Label>관심분야</Label>
            <SelectInput
              onChange={(value) => {
                setInput({
                  ...input,
                  interestTechSet: value as Tech[],
                });
              }}
              value={input.interestTechSet as Tech[]}
            />
          </Content>
          <div>
            <AddInput onClick={addForm} />
          </div>
          <DIButton
            color={theme.colors.black}
            backgroundColor={theme.colors.primary.default}
            borderColor={theme.colors.primary.default}
            onClick={() => {
              onSubmit.mutate(input as any);
            }}
            borderRadius={51}
          >
            내 프로필 저장
          </DIButton>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;

  padding-bottom: 200px;

  & > button {
    margin: 20px 0;
    margin-left: auto;
  }
`;

export default ProfileInfoArea;
