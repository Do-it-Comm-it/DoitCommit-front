import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail?: string | null;
  writerImageUrl?: string | null;
  isHome?: boolean | null;
  writer?: string | null;
  tags?: Array<string>;
}
const Thumbnail = ({
  thumbnail,
  writerImageUrl,
  isHome,
  writer,
  tags,
}: Props) => {
  return (
    <>
      {thumbnail && (
        <>
          <Container thumbnail={thumbnail}>
            <Image thumbnail={thumbnail} src={thumbnail} isHome={isHome} />
          </Container>
          {/* padding 으로 인한 Container 분리 */}
          <Container isHome={isHome}>
            {isHome ? (
              <>
                <Image src={writerImageUrl || ''} />
                <Division>
                  <Author>by. {writer}</Author>
                  <Tags>
                    {tags?.map((tag, id) => (
                      <Tags key={id}>#{tag}</Tags>
                    ))}
                  </Tags>
                </Division>
              </>
            ) : (
              <Image src={writerImageUrl || ''} />
            )}
          </Container>
        </>
      )}
      {/* 사진이 있는 게시글과 사진이 없는 게시글을 나눔. */}
      {!thumbnail && (
        <Container isHome={isHome}>
          {isHome ? (
            <>
              <Image src={writerImageUrl || ''} />
              <Division>
                <Author>{writer}</Author>
                <Tags>
                  {tags?.map((tag, id) => (
                    <Tags key={id}>#{tag}</Tags>
                  ))}
                </Tags>
              </Division>
            </>
          ) : (
            <Image src={writerImageUrl || ''} />
          )}
        </Container>
      )}
    </>
  );
};

export default Thumbnail;

const Container = styled.div<{
  thumbnail?: string | null;
  isHome?: boolean | null;
}>`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: ${({ thumbnail }) => !thumbnail && '4%'};
  padding-bottom: 0;
  display: ${({ isHome }) => (isHome ? 'flex' : 'block')};
`;

const Image = styled.img<{
  thumbnail?: string | null;
  isHome?: boolean | null;
}>`
  width: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  height: ${({ thumbnail, isHome }) =>
    isHome && thumbnail ? '139px' : thumbnail ? '170px' : '40px'};
  border-radius: ${({ thumbnail }) => (thumbnail ? '10px 10px 0 0' : '10px')};
`;

const Author = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.gray400};
  margin-left: 8px;
`;

const Tags = styled.div`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 400;
  font-size: 14px;
  margin-left: 8px;
  &:first-child {
    margin: 0;
  }
  display: flex;
`;

const Division = styled.div``;
