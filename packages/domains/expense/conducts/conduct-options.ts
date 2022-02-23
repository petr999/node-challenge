import { BadRequest } from '@nc/utils/errors';
import { Request } from 'express';

const queryKeysToFind = 'take  skip  where  order'.split(/\s+/);
const queryColumnsToMatch = 'merchantName amountInCents currency'.split(/\s+/);

export const getWhereByReq = (reqQueryWhere: {[k: string]: number | string | any[] |object}) => {
  const where: {[k: string]: number | string | any[] |object} = {};
  queryColumnsToMatch.forEach((key) => {
    switch (key) {
      case 'currency':
        if (reqQueryWhere?.currency && 'string' === typeof reqQueryWhere.currency) where.currency = reqQueryWhere.currency;
        break;
    }
  });
  return where;
};

export const getFindArgs = (reqQuery) => {
  const findArgs = {};

  if (reqQuery) {
    queryKeysToFind.forEach((key) => {
      if (reqQuery?.[key]) {
        let value;
        switch (key) {
          case 'where':
            value = getWhereByReq(reqQuery.where);
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
