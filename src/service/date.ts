const dateFormat = (date: string) => {
  // date : 2022-05-05T16:55
  if (date && date.includes('T')) {
    return date.replaceAll('-', '.').replace('T', ' ');
  }
};

const dateList = {
  dateFormat,
};

export default dateList;
