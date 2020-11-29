import test from 'ava';
import { deepMap } from './utils';

test('deepMap() apply fn', t => {
  const obj = { a: 5 };
  const fn = x => x * 2;
  t.deepEqual(deepMap(fn, obj), { a: 10 });
});

test('deepMap() apply fn deep object', t => {
  const obj = { a: { b: 5 } };
  const fn = x => x * 2;
  t.deepEqual(deepMap(fn, obj), { a: { b: 10 } });
});

test('deepMap() skip Date', t => {
  const date = new Date();
  const obj = { a: date, b: { c: date } };
  const fn = x => x * 2;
  t.deepEqual(deepMap(fn, obj), { a: date, b: { c: date } });
});

test('deepMap() apply on array', t => {
  const obj = { a: [1, 2, 3] };
  const fn = x => x * 2;
  t.deepEqual(deepMap(fn, obj), { a: [2, 4, 6] });
});

test('deepMap() apply on objects array', t => {
  const obj = { a: [{ b: 1 }, { c: 2 }, { d: 3 }] };
  const fn = x => x * 2;
  t.deepEqual(deepMap(fn, obj), { a: [{ b: 2 }, { c: 4 }, { d: 6 }] });
});
