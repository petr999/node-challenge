import { capitalize } from '../../utils';
import { User } from './types';

const publicFields = ['first_name', 'last_name', 'company_name'];

export function secureTrim(user: User): string {
  return JSON.stringify(user, publicFields);
}

export function format(rawUser): User {
  const { id, company_name, ssn } = rawUser;
  return {
    id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name,
    ssn,
  };
}
