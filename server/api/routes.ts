import * as errors from '../middlewares/errors';

import { Router } from 'express';
import { list, save, buy } from './actions';

export const router = Router();

router.get('/get-pokemons', list);
router.post('/create-pokemon', save);
router.post('/buy-pokemon', buy);

router.use(errors.notFound);