import { convertNumberToCurrencyString, formatInt } from './number';

it('converts number to currency string', () => {
  expect(convertNumberToCurrencyString(186000000)).toEqual('186,000,000');
  expect(convertNumberToCurrencyString(0)).toEqual('0');
  expect(convertNumberToCurrencyString('string')).toEqual('string');
});

it('converts zero and none integer value to Unknown', () => {
  expect(formatInt(186000000)).toEqual(186000000);
  expect(formatInt(0)).toEqual('Unknown');
  expect(formatInt('string')).toEqual('Unknown');
});
