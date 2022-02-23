import { BadRequest } from '@nc/utils/errors';
import { Expense } from '../entity';
import { FindConditions } from '@nc/utils';
import { Request } from 'express';

const queryKeysToFind = 'take  skip  where  order'.split(/\s+/);
// const queryColumnsToMatch = 'merchantName amountInCents currency'.split(/\s+/);

type JsonFlatContentTypes = {[k: string]: number | string }
type JsonContentTypes = {[k: string]: number | string | any[] |object}

export const getWhereAndLikes = (reqQueryWhere: JsonContentTypes) => {
  let whereAndLikes = {} as JsonContentTypes;
  const [where, likes]: JsonFlatContentTypes[] = [{}];
  Object.keys(reqQueryWhere).forEach((key) => {
    switch (key) {
      case 'currency':
        if (reqQueryWhere?.currency && 'string' === typeof reqQueryWhere.currency) where.currency = reqQueryWhere.currency;
        break;
    }
  });

  if (where) whereAndLikes.where = where;
  if (likes) whereAndLikes.likes = likes;

  return whereAndLikes;
};

export const getFindArgs = (reqQuery): FindConditions<Expense> => {
  let findArgs = {};

  if (reqQuery) {
    queryKeysToFind.forEach((key) => {
      if (reqQuery?.[key]) {
        let whereAndLikes;
        switch (key) {
          case 'where':
            whereAndLikes = getWhereAndLikes(reqQuery.where);
            if (whereAndLikes)findArgs = { ...findArgs, ...whereAndLikes };
            break;

          // reqQuery[key]
          // TBD
        }

        // if (value)findArgs[key] = value;
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
