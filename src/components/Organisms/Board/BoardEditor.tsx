import DIButton from '@src/components/Atoms/DIButton';
import Editor from '@src/components/Molecules/Editor/Editor';
import TagInput from '@src/components/Molecules/TagInput';
import React, { ChangeEvent, useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
// {
//     "categoryId":2,
//     "tag": [""]
//     "boardTitle": "zzzzzzz",
//     "boardContent" : "zzzzzzzz",
//     "allImageArr": [
//         {
//             "fileNm": "a803a952-47cb-4429-b8e0-f522eb8d0597_등록.JPG",
//             "filePath": "2022/03/10"
//         },
//         {
//             "fileNm": "a803a952-47cb-4429-b8e0-f522eb8d0597_삭제.JPG",
//             "filePath": "2022/03/10"
//         }],
//     "imageArr": [
//         {
//             "fileNm": "a803a952-47cb-4429-b8e0-f522eb8d0597_등록.JPG",
//             "filePath": "2022/03/10"
//         }
//     ]
// }
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
        <TagInput onChange={() => {}} value={['#개발자']} />
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
