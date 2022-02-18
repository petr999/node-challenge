import config from 'config';
import context from './middleware/context';
import express from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import { router as healthcheckRoutes } from './packages/domains/healthchecks';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';

import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';

const logger = Logger('server');
const app = express();
const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);
let serverReady = false;

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req, res) {
  const [status, msg] = (serverReady) ? [200, 'OK'] : [503, 'NOT OK'];
  res.status(status).json(msg);
});

app.use(context);
app.use(security);

app.use('/user', userRoutes);
app.use(healthcheckRoutes);

app.use(function(req, res) {
  res.status(404).json('Not Found');
});

server.listen(config.port, () => {
  serverReady = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
