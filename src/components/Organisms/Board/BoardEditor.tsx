import DIButton from '@src/components/Atoms/DIButton';
import Editor from '@src/components/Molecules/Editor/Editor';
import TagInput from '@src/components/Molecules/TagInput';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { useTheme } from 'styled-components';
import { useMutation } from 'react-query';
import { board as boardAPI } from '@src/service/api';
import { BoardImage, RequestBoard, Tag } from '@src/typings/Board';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { useImage } from '@src/hooks/useImage';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/hooks/useAuthentication';
import ToggleSwitch from '@src/components/Atoms/DIToggleSwitch';
import './snow.css';
import OpenerSVG from '@src/assets/opener.svg';
import useOutsideClick from '@src/hooks/useOutsideClick';
import { filterNumber } from '@src/utils/board';

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
  const [category, setCategory] = useState<string>('분류');
  const [isOpener, setIsOpener] = useState<boolean>(false);
  const categoryRef = useRef<HTMLUListElement>(null);
  const { mutate: postBoard } = useMutation((boardData: RequestBoard) =>
    boardAPI.saveBoard(boardData)
  );

  const { mutate: saveImage } = useImage();
  useOutsideClick(categoryRef, () => setIsOpener(false));
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
      placeholder: '내용을 입력하세요.',
      readOnly: false,
      theme: 'snow',
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
    if (category === '분류') {
      alert('게시글 분야 선택은 필수입니다.');
      setIsOpener(true);
      return;
    }
    const images = allImages.filter(
      (image) => image.url && editorState.boardContent.includes(image.url)
    );

    postBoard(
      {
        ...editorState,
        // categoryId: isNotice ? 1 : 2,
        categoryId: filterNumber(category),
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
          alert('등록에 실패했습니다.');
        },
      }
    );
  }, [allImages, editorState, tags, isNotice, postBoard, navigate]);

  return (
    <Container>
      <Header>
        <Flex>
          <TitleInput
            onChange={onChangeTitle}
            defaultValue={editorState.boardTitle}
            placeholder={'제목을 입력하세요.'}
          />
          <ButtonWrapper ref={categoryRef}>
            <FilterButton
              onClick={() => {
                setIsOpener((prev) => !prev);
              }}
            >
              {category}
            </FilterButton>
            <FilterOpener
              isOpener={isOpener}
              onClick={() => {
                setIsOpener((prev) => !prev);
              }}
            />
            {isOpener && (
              <FilterWrap>
                {['기획', '개발', '디자인'].map((e) => (
                  <Filter
                    key={e}
                    isSelect={e === category}
                    onClick={() => {
                      setCategory(e);
                      setIsOpener(false);
                    }}
                  >
                    {e}
                  </Filter>
                ))}
              </FilterWrap>
            )}
          </ButtonWrapper>
        </Flex>
        <TagInput onChange={onChangeTag} value={tags} />
      </Header>

      <Editor height={500} />
      <BottomSection>
        {user && user.role === 'ADMIN' && (
          <ToggleContainer>
            <ToggleText>{isNotice ? '공지사항' : '커뮤니티'}</ToggleText>
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
            alert('아직 개발중입니다.');
          }}
          backgroundColor={theme.colors.gray.gray600}
          width={134}
          height={51}
          borderRadius={50}
        >
          저장하기
        </DIButton>
        <DIButton
          onClick={onSubmit}
          backgroundColor={theme.colors.primary.default}
          width={134}
          height={51}
          borderRadius={50}
        >
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

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const FilterButton = styled.li`
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: none;
  cursor: pointer;
`;

const FilterOpener = styled(({ isOpener, ...props }) => (
  <OpenerSVG {...props} />
))<{ isOpener?: boolean }>`
  & > path {
    stroke: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: pointer;
  ${({ isOpener }) =>
    isOpener ? `transform: rotate(-180deg)` : `transform: rotate(0deg)`};
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  right: 0;
  left: 8;
`;

const Filter = styled.button<{ isSelect: boolean }>`
  width: 108px;
  height: 49px;
  background: ${({ isSelect }) => (isSelect ? '#F9F9F9' : '#FEFEFE')};
  border: 1px solid transparent;
  color: ${({ theme, isSelect }) =>
    isSelect ? theme.colors.primary.default : theme.colors.gray.gray950};
  cursor: pointer;
  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
  z-index: 2;
`;

export default BoardEditor;
