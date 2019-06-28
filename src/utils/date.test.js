import {
  convertStringToValidDate,
  convertDateToDisplayDate,
  getDateBasedOnSortOrder
} from './date';

it('convert string to valid date', () => {
  expect(convertStringToValidDate('02-05-2008')).toEqual(
    new Date('05-02-2008')
  );
  expect(convertStringToValidDate('22-07-2011')).toEqual(
    new Date('07-22-2011')
  );
  expect(convertStringToValidDate('2020')).toEqual(new Date('2020'));
  expect(convertStringToValidDate('Unknown')).toEqual('Unknown');
});

it('convert string to valid display date', () => {
  expect(convertDateToDisplayDate('02-05-2008')).toEqual('05/02/2008');
  expect(convertDateToDisplayDate('22-07-2011')).toEqual('07/22/2011');
  expect(convertDateToDisplayDate('2020')).toEqual('2020');
  expect(convertDateToDisplayDate('Unknown')).toEqual('Unknown');
});

it('returns date based on sort order', () => {
  expect(getDateBasedOnSortOrder(new Date('02-05-2008'), 'asc')).toEqual(
    new Date('02-05-2008')
  );

  expect(getDateBasedOnSortOrder('Wrong date', 'asc')).toEqual(
    new Date('2999')
  );

  expect(getDateBasedOnSortOrder('Wrong date', 'desc')).toEqual(new Date(null));
});
