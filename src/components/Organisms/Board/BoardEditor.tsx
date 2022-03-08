import DIButton from '@src/components/Atoms/DIButton';
import DIInput from '@src/components/Atoms/DIInput';
import Editor from '@src/components/Molecules/Editor/Editor';
import React, { ChangeEvent, useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';

const BoardEditor = () => {
  const theme = useTheme();
  const [title, setTitle] = useState<string>('');

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  return (
    <Container>
      <Header>
        <TitleInput onChange={onChangeTitle} defaultValue={title} placeholder={'제목을 입력하세요.'} />
        {/* <TagInput /> */}
      </Header>
      <Editor height={500} />
      <BottomSection>
        <DIButton onClick={() => {}} backgroundColor={theme.colors.dark.a5} width={134} height={51} borderRadius={50}>
          저장하기
        </DIButton>
        <DIButton onClick={() => {}} backgroundColor={theme.colors.main} width={134} height={51} borderRadius={50}>
          발행하기
        </DIButton>
      </BottomSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto 200px;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const TitleInput = styled.input`
  border: none;
  outline: none;

  background-color: ${({ theme }) => theme.colors.body};

  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 51px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.dark.a2};
  }
`;

const BottomSection = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: auto;
  gap: 10px;
`;

export default BoardEditor;
