/**
 *
 * @param string
 * @returns 'DESC', 'HEART' , 'VIEW'
 */

function filterString(string: string) {
  switch (string) {
    case '최신순':
      return 'DESC';
    case '좋아요순':
      return 'HEART';
    case '조회수순':
      return 'VIEW';
    default:
      return 'DESC';
  }
}
/**
 *
 * @param string
 * @returns 0전체, 1 기획자 2 개발자 3 디자인
 */

function filterNumber(string: string) {
  switch (string) {
    case '전체':
      return 0;
    case '기획':
      return 1;
    case '개발':
      return 2;
    case '디자인':
      return 3;
    default:
      return 0;
  }
}

export { filterString, filterNumber };
