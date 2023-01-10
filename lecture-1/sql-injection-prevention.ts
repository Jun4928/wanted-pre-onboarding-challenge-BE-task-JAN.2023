import { NextFunction, Request, Response } from 'express';
import { entries, isString, map, pipe } from '@fxts/core';
import { ParsedQs } from 'qs';

const SQL_INJECTION_CHARS_REGEXP =
  /'|"|=|<|>|\(|\)|union|sp_|xp_|select|drop|union|--|#|;|cmdshell|,|\s/gi;

type QueryStringValue =
  | undefined
  | string
  | string[]
  | ParsedQs
  | ParsedQs[];

const filterSQLInjectionChars = function recur(
  value: QueryStringValue,
): QueryStringValue {
  if (value === undefined) {
    return;
  }

  // filter
  if (isString(value)) {
    // return value.replace(SQL_INJECTION_CHARS_REGEXP, '');
    return pipe(
      value,
      (str) => str.replace(SQL_INJECTION_CHARS_REGEXP, ''),
      (str) => {
        if (SQL_INJECTION_CHARS_REGEXP.test(str)) {
          return recur(str);
        }

        return str;
      },
    );
  }

  return value;
};

// 1. req.query => 객체의 형태 => 배열
// 2. [key, value]
// 3. value 에 regular expression filter
// 4. 다시 객체를 만든다.
export const sqlInjectionPrevention = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.query = pipe(
    req.query,
    entries,
    map(([key, value]) => [
      key,
      filterSQLInjectionChars(value),
    ]),
    Object.fromEntries,
  );

  next();
};
