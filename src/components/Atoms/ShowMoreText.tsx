import ExpandIconSVG from '@src/assets/expand_comment.svg';
import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  length?: number;
};

const ShowMoreText = ({ length, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <LengthText>{length || 0}개의 댓글 더 보기</LengthText>
      <ExpandIcon />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-basis: content;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  margin-bottom: 1.75rem;
`;

const LengthText = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 400;
  font-size: 16px;

  cursor: pointer;
`;

const ExpandIcon = styled(ExpandIconSVG)`
  path {
    fill: ${({ theme }) => theme.colors.primary.default};
  }
`;

export default React.memo(ShowMoreText);
