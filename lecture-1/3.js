const curry =
  (func) =>
  (a, ...args) =>
    args.length > 0
      ? func(a, ...args)
      : (...args) => func(a, ...args);

const map = curry((func, iter) => {
  const result = [];
  for (const el of iter) {
    result.push(func(el));
  }

  return result;
});

const filter = curry((func, iter) => {
  const result = [];
  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
});

const reduce = curry((func, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
});

const pipe = (iter, ...functions) =>
  reduce((prev, func) => func(prev), iter, functions);

const arr = [1, 2, 3, 4, 5];
/**
 * 함수의 평가시점 미루기, curry
 */

// console.log(add(1, 3));
// console.log(add(1));
// console.log(add(1)(3));

/**
 * 로직을 더 간단하게 나타내기
 */

// pipe(
//   arr,
//   (arr) => filter((el) => el % 2 === 1, arr),
//   (arr) => map((el) => el * 2, arr),
//   (arr) => reduce((prev, curr) => prev + curr, arr),
//   console.log,
// );
//
// pipe(
//   arr,
//   (arr) => filter((el) => el % 2 === 1)(arr),
//   (arr) => map((el) => el * 2)(arr),
//   (arr) => reduce((prev, curr) => prev + curr)(arr),
//   console.log,
// );

// 1. 홀수만 걸러주세요
// 2. 걸러진 원소에 곱하기 2를 해주세요
// 3. 모두 다 더해주세요

// pipe(
//   arr,
//   filter((el) => el % 2 === 1),
//   map((el) => el * 2),
//   reduce((prev, curr) => prev + curr),
//   console.log,
// );

const people = [
  {
    name: 'jenny',
    age: 30,
    city: 'seoul',
  },
  {
    name: 'jenifer',
    age: 20,
    city: 'seoul',
  },
  {
    name: 'chris',
    age: 15,
    city: 'tokyo',
  },
  {
    name: 'dave',
    age: 40,
    city: 'london',
  },
];

pipe(
  people,
  filter((person) => person.city === 'seoul'),
  map((person) => person.name),
  console.log,
);

const add = (a, b) => a + b;

pipe(
  people,
  filter((person) => person.city === 'seoul'),
  map((person) => person.age),
  reduce(add),
  console.log,
);

pipe(
  people,
  filter((person) => person.name.startsWith('j')), // j로 시작하는 이름을 가진 사람들의
  filter((person) => person.age <= 20), // 나이가 20살 이하인 사람만 데이터를 뽑아주세요
  map((person) => person.city), // 나이가 20살 이하인 사람만 데이터를 뽑아주세요
  console.log,
);

const select = 'SELECT * FROM people';
