import { BadRequest } from '@nc/utils/errors';
import { Request } from 'express';

const getFindArgs = (reqQuery) => {
  const findArgs = reqQuery ? {} : {};

  return findArgs;
};

export const conductGetUserExpenses = (req: Request) => {
  let conductError;
  let [userId, findArgs] = [undefined, {}];
  userId = req.params?.userId;
  if (!userId) conductError = BadRequest('User: not set');
  findArgs = getFindArgs(req.query);

  return { findArgs, conductError, userId };
};
