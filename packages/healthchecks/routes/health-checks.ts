import { dbHealthcheck } from '../data/db-healthcheck';
import { Router } from 'express';

export const router = Router();

router.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).json('OK');
});

router.get('/db-healthcheck', async function dbHealthcheckEndpoint(req, res) {
  const [dbQuerySuccess, msg] = await dbHealthcheck();

  const [status, body] = dbQuerySuccess ? [200, 'OK']
    : [503, `NOT OK: '${msg}'`];

  return res.status(status).json(body);
});
