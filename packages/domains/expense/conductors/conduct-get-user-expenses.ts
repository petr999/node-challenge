import { BadRequest } from '@nc/utils/errors';
import { Request } from 'express';

export const getFindArgs = (reqQuery) => {
  const findArgs = reqQuery ? {} : {};

  return findArgs;
};

export const conductGetUserExpenses = (req: Request) => {
  let conductError;

  const userId = req.params?.userId;
  if (!userId) conductError = BadRequest('User: not set');
  const findArgs = getFindArgs(req.query);

  return { findArgs, conductError, userId };
};
