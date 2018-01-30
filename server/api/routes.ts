import * as errors from '../middlewares/errors';

import { Router } from 'express';
import { list, save, buy } from './actions';

export const router = Router();

router.get('/get-pokemons', list);
router.post('/create-pokemons', save);
router.post('/buy-pokemons/:name/:quantity', buy);

router.use(errors.notFound);