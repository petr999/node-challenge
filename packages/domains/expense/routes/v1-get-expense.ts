import { ApiError } from '@nc/utils/errors';
import { conductGetUserExpenses } from '../conductors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/user/:userId', async (req, res, next) => {
  const { conductError, findArgs, userId } = conductGetUserExpenses(req);

  if (conductError) return next(new ApiError(conductError, conductError.status, `Invalid user input: '${userId}'`, conductError.title, req));

  const [userError, userExpenses] = await to(getUserExpenses(userId, findArgs));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user expenses: ${userError}`, userError.title, req));
  }

  if (!userExpenses) {
    return res.json([]);
  }

  return res.json(
    secureTrim(...userExpenses)
  );
});
