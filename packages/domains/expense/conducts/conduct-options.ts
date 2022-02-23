import { BadRequest } from '@nc/utils/errors';
import { Expense } from '../entity';
import { Request } from 'express';
import { FindConditions, FindOperator, Like } from '@nc/utils';

const queryKeysToFind = 'take  skip  where  order'.split(/\s+/);
// const queryColumnsToMatch = 'merchantName amountInCents currency'.split(/\s+/);

type WhereType = {[k: string]: number | string | FindOperator<string> }
type JsonContentTypes = {[k: string]: number | string | any[] |object}

export const getWhereMerchantName = (nameByReq: string) => {
  const merchantName = nameByReq.match(/\*/)
    ? Like(nameByReq.replace(/\*+/, '%'))
    : nameByReq;

  return merchantName;
};

export const getWhere = (reqQueryWhere: JsonContentTypes) => {
  const where: WhereType = {};
  Object.keys(reqQueryWhere).forEach((key) => {
    switch (key) {
      case 'currency':
        if (reqQueryWhere?.currency && 'string' === typeof reqQueryWhere.currency) where.currency = reqQueryWhere.currency;
        break;
      case 'merchantName':
        if (reqQueryWhere?.merchantName && 'string' === typeof reqQueryWhere.merchantName) where.merchantName = getWhereMerchantName(reqQueryWhere.merchantName);
        break;
    }
  });

  return where;
};

export const getFindArgs = (reqQuery): FindConditions<Expense> => {
  let findArgs = {};

  if (reqQuery) {
    queryKeysToFind.forEach((key) => {
      if (reqQuery?.[key]) {
        let where;
        switch (key) {
          case 'where':
            where = getWhere(reqQuery.where);
            if (where)findArgs = { ...findArgs, where };
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
