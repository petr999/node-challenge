import { query } from '@nc/utils/db';

export function dbHealthcheck() {
  return query('SELECT 1')
    .then((response) => response.rows?.[0]?.[0]);
}
