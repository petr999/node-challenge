import { query } from '@nc/utils/db';
import { QueryResult } from 'pg';

export async function dbHealthcheck() {
  const dbQuery = 'SELECT 1';

  let [dbError, msg] = [false, ''];
  let dbResult: {}[];

  try {
    dbResult = await query(dbQuery);
  } catch (e) {
    dbError = true;
    msg = e.message;
  }

  const dbQuerySuccess = !dbError && dbResult && (1 === dbResult.length)
  && (1 === Object.entries(dbResult?.[0] ?? {})?.[0]?.[1]);

  return [dbQuerySuccess, msg];
}
