import { Router } from 'express';
import * as errors from './middlewares/errors';
import { router as pokemonApi } from './api/routes';

export const router = Router();

router.use('/', pokemonApi);
router.use(errors.notFound);