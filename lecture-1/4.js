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

// const arr = [1, 2, 3, 4, 5, ...100000000];

/**
 * generator
 * reference:
 * ex) range
 */
const range = function* (limit) {
  let i = -1;
  while (++i < limit) {
    yield i;
  }
};

/**
 * 지연평가
 * Lazy map
 */
const Lmap = curry(function* (func, iter) {
  for (const el of iter) {
    console.log(`Lazy Map: ${el}`);
    yield func(el);
  }
});

/**
 * 지연평가
 * Lazy filter
 */
const Lfilter = curry(function* (func, iter) {
  for (const el of iter) {
    console.log(`Lazy Filter: ${el}`);
    if (func(el)) {
      yield el;
    }
  }
});

const arr = [1, 2, 3, 4, 5];

pipe(
  arr,
  filter((el) => el % 2 === 1),
  map((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,
);

pipe(
  arr,
  Lfilter((el) => el % 2 === 1),
  Lmap((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,
);
