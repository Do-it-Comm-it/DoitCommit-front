function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function filterString(string: string) {
  switch (string) {
    case '최신순':
      return 'DESC';
    case '좋아요순':
      return 'HEART';
    case '조회수순':
      return 'VIEW';
    default:
      break;
  }
}

export { titleCase, filterString };
