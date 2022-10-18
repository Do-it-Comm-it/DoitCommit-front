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

function StringToFilterNumber(number: number) {
  switch (number) {
    case 0:
      return '전체';
    case 1:
      return '기획';
    case 2:
      return '개발';
    case 3:
      return '디자인';
    default:
      return '전체';
  }
}

export { filterString, filterNumber, StringToFilterNumber };
