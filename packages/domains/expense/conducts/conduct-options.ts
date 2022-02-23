import { BadRequest } from '@nc/utils/errors';
import { Expense } from '../entity';
import { Request } from 'express';
import { FindConditions, FindOperator, LessThanOrEqual, Like, MoreThanOrEqual } from '@nc/utils';

const queryKeysToFind = 'take  skip  where  order'.split(/\s+/);
// const queryColumnsToMatch = 'merchantName amountInCents currency'.split(/\s+/);

type WhereType = {[k: string]: number | string | FindOperator<string|number> }
type JsonContentTypes = {[k: string]: number | string | any[] |object}

export const getWhereMerchantName = (nameByReq: string) => {
  const merchantName = nameByReq.match(/\*/)
    ? Like(nameByReq.replace(/\*+/, '%'))
    : nameByReq;

  return merchantName;
};

// changes the 'where' argument
export function getWhereAmountPartial(key: string, val: number | undefined, where: WhereType) {
  if ('number' === typeof val && 0.01 <= Math.abs(val)) {
    const amountInCents = 100 * val;
    switch (key) {
      case 'amount':
        where.amountInCents = amountInCents;
        break;
      case 'amount_min':
        where.amountInCents = MoreThanOrEqual(amountInCents);
        break;
      case 'amount_max':
        where.amountInCents = LessThanOrEqual(amountInCents);
        break;
    }
  }
}

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
      case 'amount':
      case 'amountMin':
      case 'amountMax':
        if (reqQueryWhere?.[key] && 'string' === typeof reqQueryWhere[key]) getWhereAmountPartial(key, parseFloat(reqQueryWhere[key].toString()), where); // changes 'where'!
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
