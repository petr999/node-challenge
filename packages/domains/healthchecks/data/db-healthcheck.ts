import { query } from '@nc/utils/db';

export function dbHealthcheck() {
  return query('SELECT 1');
}
