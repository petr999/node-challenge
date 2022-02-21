import { getConnection } from '@nc/utils/dal';

export function readUser(userId) {
  return getConnection().query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response?.[0]);
}
