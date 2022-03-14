import DIButton from '@src/components/Atoms/DIButton';
import Editor from '@src/components/Molecules/Editor/Editor';
import TagInput from '@src/components/Molecules/TagInput';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useMutation } from 'react-query';
import { saveBoardData } from '@src/service/api';
import { RequestBoard } from '@src/typings/Board';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
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

const Module = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ align: [] }],
    ],
    readOnly: false,
    theme: 'snow',
  },
};

const defaultEditorState: RequestBoard = {
  allImageArr: [],
  imageArr: [],
  boardTitle: '',
  boardContent: '',
  categoryId: 2,
  tag: [],
};

const BoardEditor = () => {
  const theme = useTheme();
  const [html, setHtml] = useState<string | null>(null);
  const [AllImages, setAllImages] = useState<string[]>([]);
  const [saveImages, setImages] = useState<string[]>([]);
  const [editorState, setEditorState] = useState<RequestBoard>(defaultEditorState);

  const onSubmit = useMutation((boardData: RequestBoard) => saveBoardData(boardData));

  useEffect(() => {
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

    const imageDropHandler = (imageDataUrl: string, type: string, imageData: any) => {
      const file = imageData.toFile();

      // generate a form data
      const formData = new FormData();

      // or just append the file
      formData.append('file', file);
      if (quill) {
        let index = (quill.getSelection() || {}).index;
        if (index === undefined || index < 0) index = quill.getLength();
        const url = 'https://picsum.photos/200';

        quill.insertEmbed(index, 'image', url);
      }
    };

    const imageHandler = (clicked: boolean) => {
      if (clicked) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
          if (input.files && quill) {
            let file = input.files[0];
            let formData = new FormData();
            formData.append('file', file);
            let index = (quill.getSelection() || {}).index;
            if (index === undefined || index < 0) index = quill.getLength();
            const url = 'https://picsum.photos/200';

            quill.insertEmbed(index, 'image', url);
          }
        };
      }
    };

    const quill = new Quill('#editor', {
      modules: {
        ...Module,
        imageDropAndPaste: {
          handler: imageDropHandler,
        },
      },
      placeholder: '내용을 입력하세요.',
      readOnly: false,
      theme: 'snow',
    });
    quill.getModule('toolbar').addHandler('image', imageHandler);

    quill.on('text-change', () => {
      const { ops } = quill.getContents();
      //content information.
      const converter = new QuillDeltaToHtmlConverter(ops, {});
      setHtml(converter.convert());
    });
  }, []);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditorState((prev) => ({ ...prev, boardTitle: e.target.value }));
  }, []);

  const onChangeTag = useCallback((value) => {
    console.log(value);
    setEditorState((prev) => ({ ...prev, tag: value }));
  }, []);

  console.log(editorState);

  return (
    <Container>
      <Header>
        <TitleInput onChange={onChangeTitle} defaultValue={editorState.boardTitle} placeholder={'제목을 입력하세요.'} />
        <TagInput onChange={onChangeTag} value={editorState.tag} />
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

const Container = styled.form`
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
