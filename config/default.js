require('dotenv').config();
const path = require('path');
const { env } = require('process');

const db = {
  host: env.DB_HOST ?? '0.0.0.0',
  port: 5432,
  database: env.CHALLENGE_DB ?? 'challenge',
};
if (env.CHALLENGE_USER) db.user = env.CHALLENGE_USER;
if (env.CHALLENGE_PASS) db.password = env.CHALLENGE_PASS;

module.exports = {
  db,
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  entities: [path.resolve(__dirname, 'packages/domans/*/entity/*.{ts,js}'),
  ],
  host: 'localhost:9001',
  https: {
    enabled: false,
  },
  port: process.env.PORT || 9001,
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
