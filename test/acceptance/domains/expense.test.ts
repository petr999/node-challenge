import { Api } from '../utils/api';

describe('Unknown user\'s expenses not found', () => {
  test('Random user returns Not Found', (done) => {
    Api.get('/expense/v1/user/12992732-bd00-4a9a-9426-131bd618740e')
      .expect(404, done);
  });
});

describe('User expense found in database', () => {
  test('User expense known to be contained in database got fetched', (done) => {
    Api.get('/expense/v1/user/da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeFalsy();
        expect(res.body).toMatchSnapshot('expense-user-by-user-id-da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
        done();
      });
  });
});
