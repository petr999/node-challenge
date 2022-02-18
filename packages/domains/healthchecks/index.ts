import { router as healthChecks } from './routes/health-checks';
import { Router } from 'express';

export const router = Router();

router.use(healthChecks);
