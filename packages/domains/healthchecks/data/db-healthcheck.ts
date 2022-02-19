import { query } from '@nc/utils/db';
import { QueryResult } from 'pg';

export async function dbHealthcheck() {
  const dbQuery = 'SELECT 1';

  let [dbError, msg] = [false, ''];
  let dbResult: QueryResult<any>;

  try {
    dbResult = await query(dbQuery);
  } catch (e) {
    dbError = true;
    msg = e.message;
  }

  const dbQuerySuccess = !dbError && dbResult && (1 === dbResult.rowCount)
  && (1 === Object.entries(dbResult.rows[0])[0][1]);

  return [dbQuerySuccess, msg];
}
