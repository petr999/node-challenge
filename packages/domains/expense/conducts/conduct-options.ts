import { BadRequest } from '@nc/utils/errors';
import { Request } from 'express';

const queryKeysToFind = 'take  skip  where  order'.split(/\s+/);
// const queryColumnsToMatch = 'merchantName amountInCents currency'.split(/\s+/);

export const getFindArgs = (reqQuery) => {
  const findArgs = {};

  if (reqQuery) {
    queryKeysToFind.forEach((key) => {
      if (reqQuery?.[key]) {
        let value;
        switch (key) {
          case 'currency':
            break;
          // reqQuery[key]
          // TBD
        }

        if (value)findArgs[key] = value;
      }
    });
  }

  return findArgs;
};

export const conductOptions = (req: Pick<Request, 'params'| 'query'>) => {
  let conductError;

  const userId = req.params?.userId;
  if (!userId) conductError = BadRequest('User: not set');
  const findArgs = getFindArgs(req.query);

  return { findArgs, conductError, userId };
};
