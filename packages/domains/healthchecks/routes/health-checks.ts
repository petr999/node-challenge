import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).json('OK');
});
