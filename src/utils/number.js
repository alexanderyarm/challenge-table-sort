const formatInt = num => {
  if (num === 0) {
    return 'Unknown';
  }
  return Number.isInteger(num) ? num : 'Unknown';
};

const convertNumberToCurrencyString = num =>
  Number.isInteger(num)
    ? num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    : num;

export { convertNumberToCurrencyString, formatInt };
