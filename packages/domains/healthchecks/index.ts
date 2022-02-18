import { Router } from 'express';
import { router as healthChecks } from './routes/health-checks';

export const router = Router();

router.use(healthChecks);
