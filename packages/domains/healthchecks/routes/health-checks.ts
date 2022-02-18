import { dbHealthcheck } from '../data/db-healthcheck';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).json('OK');
});

router.get('/db-healthcheck', async function dbHealthcheckEndpoint(req, res) {
  const [dbError, dbResult] = await to(dbHealthcheck());

  const [status, msg] =
  (dbError || !dbResult || (1 !== dbResult))
    ? [503, 'NOT OK' + (dbError
      ? `: '${dbError.message}'` : ''),
    ] :
    [200, 'OK'];

  return res.status(status).json(msg);
});
