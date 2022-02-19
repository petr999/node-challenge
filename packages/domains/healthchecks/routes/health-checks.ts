import { dbHealthcheck } from '../data/db-healthcheck';
import { QueryResult } from 'pg';
import { Router } from 'express';

export const router = Router();

router.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).json('OK');
});

router.get('/db-healthcheck', async function dbHealthcheckEndpoint(req, res) {
  let [status, msg] = [500, 'Db Healthcheck is broken'];
  let colName: string;
  let dbError = false;
  let dbResult: QueryResult<any>;

  try {
    dbResult = await dbHealthcheck();
    colName = Object.keys(dbResult.rows?.[0])?.[0];
  } catch (e) {
    dbError = true;
    msg = e.message;
  }

  [status, msg] = (dbError || !dbResult || (1 !== dbResult.rows.length)
  || (1 !== dbResult.rows[0][colName]))
    ? [503, 'NOT OK' + (msg
      ? `: '${msg}'` : ''),
    ] :
    [200, 'OK'];

  return res.status(status).json(msg);
});
