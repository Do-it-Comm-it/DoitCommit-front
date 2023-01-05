import useOutsideClick from '@src/hooks/useOutsideClick';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBoardListMutation } from '@src/hooks/useBoards';
import { board as boardApi } from '@src/service/api';
import { IBoard } from '@src/typings/Board';
import DeleteSvg from '@src/assets/delete.svg';
import { useRecoilValue } from 'recoil';
import myBoardAtom from '@src/recoil/atom/myBoard';
interface Props {
  board: IBoard;
  category: number | null;
  search: string;
  isBookmark: boolean;
  isHome?: boolean;
  isPopular?: boolean;
}

const MoreVert = ({ board, category, search, isBookmark }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [deleteStep, setDeleteStep] = useState<number>(1);
  const myBoard = useRecoilValue(myBoardAtom);
  const onClickMore = useCallback((value) => {
    setShowMore(value);
  }, []);
  const onHover = useCallback((value) => {
    setIsHover(value);
  }, []);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => {
    setShowMore(false);
    setDeleteStep(1);
  });
  const mutation = useBoardListMutation(
    {
      myBookmark: !board.myBookmark,
    },
    myBoard.bookmark ? boardApi.toggleBookmark : boardApi.deleteBoardHistory,
    category,
    search,
    isBookmark
  );
  const onClickBoardMutate = useCallback(async () => {
    mutation.mutate(board);
  }, [mutation, board]);
  return (
    <>
      {!showMore && (
        <Block
          onClick={() => {
            onClickMore(!showMore);
          }}
        >
          <Circle />
          <Circle />
          <Circle />
        </Block>
      )}
      {showMore && deleteStep === 1 && (
        <>
          <DeleteModal
            isHover={isHover}
            onMouseEnter={() => {
              onHover(true);
            }}
            onMouseLeave={() => {
              onHover(false);
            }}
            ref={modalRef}
            onClick={() => {
              setDeleteStep(2);
            }}
            step={deleteStep}
          >
            삭제하기
          </DeleteModal>
        </>
      )}
      {deleteStep === 2 && (
        <DeleteModal
          step={deleteStep}
          ref={modalRef}
          onClick={() => {
            onClickBoardMutate();
            setDeleteStep(1);
            setShowMore(false);
          }}
        >
          <DeleteWrap>
            <DeleteIcon width={20} height={20} />
            <div>삭제</div>
          </DeleteWrap>
        </DeleteModal>
      )}
    </>
  );
};

export default MoreVert;

const Block = styled.div`
  cursor: pointer;
  margin-left: 8px;
`;

const Circle = styled.div`
  border-radius: 50px;
  width: 3px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.gray.gray400};
  margin: 3px 0px;
`;

const DeleteModal = styled.button<{ isHover?: boolean; step: number }>`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray.gray100};
  width: 80px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: ${({ theme, isHover, step }) =>
    isHover && step === 1
      ? theme.colors.primary.default
      : !isHover && step === 1
      ? theme.colors.gray.gray950
      : step === 2
      ? theme.colors.warning
      : null};
`;

const DeleteWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteIcon = styled(DeleteSvg)`
  & > path {
    stroke: ${({ theme }) => theme.colors.warning};
  }
`;
