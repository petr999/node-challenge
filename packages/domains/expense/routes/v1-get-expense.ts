import { ApiError } from '@nc/utils/errors';
import { conductGetUserExpenses } from '../conductors';
import { getUserExpenses } from '../handlers';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/user/:userId/expenses', async (req, res, next) => {
  let userError; let
    userExpenses;
  const { findArgs, conductError, userId } = conductGetUserExpenses(req);

  if (conductError) userError = conductError;
  else [userError, userExpenses] = await to(getUserExpenses(userId, findArgs));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user expenses: ${userError}`, userError.title, req));
  }

  if (!userExpenses) {
    return res.json([]);
  }

  return res.json(
    // secureTrim
    (userExpenses)
  );
});
