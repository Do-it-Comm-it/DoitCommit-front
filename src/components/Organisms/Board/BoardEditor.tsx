import DIButton from '@src/components/Atoms/DIButton';
import Editor from '@src/components/Molecules/Editor/Editor';
import TagInput from '@src/components/Molecules/TagInput';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useMutation } from 'react-query';
import { board as boardAPI } from '@src/service/api';
import { BoardImage, RequestBoard, Tag } from '@src/typings/Board';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { useImage } from '@src/hooks/useImage';
import { useNavigate } from 'react-router-dom';
import './bubble.css';
import { useUser } from '@src/hooks/useAuthentication';
import ToggleSwitch from '@src/components/Atoms/DIToggleSwitch';
const Module = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
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
  boardHashtag: [],
};

const BoardEditor = () => {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isNotice, setIsNotice] = useState<boolean>(false);
  const [allImages, setAllImages] = useState<BoardImage[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editorState, setEditorState] =
    useState<RequestBoard>(defaultEditorState);

  const { mutate: postBoard } = useMutation((boardData: RequestBoard) =>
    boardAPI.saveBoard(boardData)
  );

  const { mutate: saveImage } = useImage();

  useEffect(() => {
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

    const imageDropHandler = (
      imageDataUrl: string,
      type: string,
      imageData: any
    ) => {
      const file = imageData.toFile();

      // generate a form data
      const formData = new FormData();

      // or just append the file
      formData.append('file', file);
      if (quill) {
        saveImage(formData, {
          onSuccess: (data) => {
            setAllImages((prev) => [
              ...prev,
              {
                fileNm: data.fileMap.fileNm,
                filePath: data.fileMap.filePath,
                url: data.url,
              },
            ]);
            let index = (quill.getSelection() || {}).index;
            if (index === undefined || index < 0) index = quill.getLength();

            quill.insertEmbed(index, 'image', data.url);
          },
        });
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

            saveImage(formData, {
              onSuccess: (data) => {
                setAllImages((prev) => [
                  ...prev,
                  {
                    fileNm: data.fileMap.fileNm,
                    filePath: data.fileMap.filePath,
                    url: data.url,
                  },
                ]);
                let index = (quill.getSelection() || {}).index;
                if (index === undefined || index < 0) index = quill.getLength();

                quill.insertEmbed(index, 'image', data.url);
              },
            });
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
      placeholder: '????????? ???????????????.',
      readOnly: false,
      theme: 'bubble',
    });

    quill.getModule('toolbar').addHandler('image', imageHandler);

    quill.on('text-change', () => {
      const { ops } = quill.getContents();
      //content information.
      const converter = new QuillDeltaToHtmlConverter(ops, {});
      setEditorState((prev) => ({
        ...prev,
        boardContent: converter.convert(),
      }));
    });
  }, [saveImage]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditorState((prev) => ({ ...prev, boardTitle: e.target.value }));
  }, []);

  const onChangeTag = useCallback((value) => {
    setTags(value);
  }, []);

  const onSubmit = useCallback(() => {
    const images = allImages.filter(
      (image) => image.url && editorState.boardContent.includes(image.url)
    );

    postBoard(
      {
        ...editorState,
        categoryId: isNotice ? 1 : 2,
        boardHashtag: tags.map((t) => String(t.tagId)),
        allImageArr: allImages.map((i) => ({
          fileNm: i.fileNm,
          filePath: i.filePath,
        })),
        imageArr: images.map((i) => ({
          fileNm: i.fileNm,
          filePath: i.filePath,
        })),
      },
      {
        onSuccess: (data) => {
          navigate(-1);
        },
        onError: () => {
          alert('????????? ??????????????????.');
        },
      }
    );
  }, [allImages, editorState, tags, isNotice, postBoard, navigate]);

  return (
    <Container>
      <Header>
        <TitleInput
          onChange={onChangeTitle}
          defaultValue={editorState.boardTitle}
          placeholder={'????????? ???????????????.'}
        />
        <TagInput onChange={onChangeTag} value={tags} />
      </Header>
      <Editor height={500} />
      <BottomSection>
        {user && user.role === 'ADMIN' && (
          <ToggleContainer>
            <ToggleText>{isNotice ? '????????????' : '????????????'}</ToggleText>
            <ToggleSwitch
              value={isNotice}
              onChange={() => {
                setIsNotice((prev) => !prev);
              }}
            />
          </ToggleContainer>
        )}

        <DIButton
          onClick={() => {
            alert('?????? ??????????????????.');
          }}
          backgroundColor={theme.colors.gray.gray600}
          width={134}
          height={51}
          borderRadius={50}
        >
          ????????????
        </DIButton>
        <DIButton
          onClick={onSubmit}
          backgroundColor={theme.colors.primary.default}
          width={134}
          height={51}
          borderRadius={50}
        >
          ????????????
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

  background-color: ${({ theme }) => theme.colors.primary.light500};

  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 51px;

  color: ${({ theme }) => theme.colors.black};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray300};
  }
`;

const BottomSection = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: auto;
  gap: 10px;
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 150px;
  align-items: center;
  height: 100%;
`;

const ToggleText = styled.div`
  width: 90px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 51px;

  color: ${({ theme }) => theme.colors.black};
`;
export default BoardEditor;
