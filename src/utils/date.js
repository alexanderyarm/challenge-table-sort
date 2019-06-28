const convertStringToValidDate = dateStr => {
  const [day, month, year] = dateStr.split('-');

  if (day && month && year) {
    return new Date(year, month - 1, day);
  }

  if (!isNaN(Date.parse(dateStr))) {
    return new Date(dateStr);
  } else {
    return dateStr;
  }
};

const convertDateToDisplayDate = dateStr => {
  const [day, month, year] = dateStr.split('-');

  if (day && month && year) {
    return new Date(year, month - 1, day).toLocaleDateString('en-gb', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return dateStr;
};

const getDateBasedOnSortOrder = (date, sortOrder) => {
  if (!(date instanceof Date)) {
    return sortOrder === 'asc' ? new Date('2999') : new Date(null);
  }

  return date;
};

export {
  convertStringToValidDate,
  convertDateToDisplayDate,
  getDateBasedOnSortOrder
};
