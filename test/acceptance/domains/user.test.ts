import { Api } from '../utils/api';

describe('Unknown user not found', () => {
  test('Random user returns Not Found', (done) => {
    Api.get('/user/v1/get-user-details?userId=12992732-bd00-4a9a-9426-131bd618740e')
      .expect(404, done);
  });
});
