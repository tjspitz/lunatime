import { makeCycle } from '../lib/mCalc';

test('mCalc will create a "first" cycle entry for the db', () => {
  const form = {
    cycleLength: 30,
    periodLength: 5,
    periodStart: new Date('November 16, 2023'),
    lastEdited: new Date('November 16, 2023'),
  };
  const expected = {
    lastEdited: form.lastEdited,
    cycleLength: form.cycleLength,
    periodLength: form.periodLength,
    menstrualRange: [
      form.periodStart,
      new Date('November 20, 2023'),
    ],
    fertileRange: [
      new Date('November 25, 2023'),
      new Date('December 3, 2023'),
    ],
    pmsRange: [
      new Date('December 4, 2023'),
      new Date('December 15, 2023'),
    ],
  };

  const actual = makeCycle(form);
  expect(actual).toStrictEqual(expected);
});

test('mCalc will create a "second" cycle entry for the db', () => {
  const form = {
    cycleLength: 30,
    periodLength: 5,
    periodStart: new Date('December 16, 2023'),
    lastEdited: new Date('November 16, 2023'),
  }
  const expected = {
    lastEdited: form.lastEdited,
    cycleLength: form.cycleLength,
    periodLength: form.periodLength,
    menstrualRange: [
      new Date('December 16, 2023'),
      new Date('December 20, 2023'),
    ],
    fertileRange: [
      new Date('December 25, 2023'),
      new Date('January 2, 2024'),
    ],
    pmsRange: [
      new Date('January 3, 2024'),
      new Date('January 14, 2024'),
    ],
  };

  const actual = makeCycle(form);
  expect(actual).toStrictEqual(expected);
});

test('mCalc will handle unusually short windows', () => {
  const form = {
    cycleLength: 21,
    periodLength: 3,
    periodStart: new Date('November 16, 2023'),
    lastEdited: new Date('November 16, 2023'),
  }
  const expected = {
    lastEdited: form.lastEdited,
    cycleLength: form.cycleLength,
    periodLength: form.periodLength,
    menstrualRange: [
      new Date('November 16, 2023'),
      new Date('November 18, 2023'),
    ],
    fertileRange: [
      new Date('November 16, 2023'),
      new Date('November 24, 2023'),
    ],
    pmsRange: [
      new Date('November 25, 2023'),
      new Date('December 6, 2023'),
    ],
  };

  const actual = makeCycle(form);
  expect(actual).toStrictEqual(expected);
});

test('mCalc will handle unusually long windows', () => {
  const form = {
    cycleLength: 35,
    periodLength: 8,
    periodStart: new Date('November 16, 2023'),
    lastEdited: new Date('November 16, 2023'),
  }
  const expected = {
    lastEdited: form.lastEdited,
    cycleLength: form.cycleLength,
    periodLength: form.periodLength,
    menstrualRange: [
      new Date('November 16, 2023'),
      new Date('November 23, 2023'),
    ],
    fertileRange: [
      new Date('November 30, 2023'),
      new Date('December 8, 2023'),
    ],
    pmsRange: [
      new Date('December 9, 2023'),
      new Date('December 20, 2023'),
    ],
  };

  const actual = makeCycle(form);
  expect(actual).toStrictEqual(expected);
});
