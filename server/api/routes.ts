import * as errors from '../middlewares/errors';

import { Router } from 'express';
import { list, save, buy } from './actions';

export const router = Router();


router.get('/', (req, res) => res.json({ status: 'Alive'}));

router.get('/pokemons', list);
router.post('/pokemons', save);
router.post('/pokemons/buy', buy);

router.use(errors.notFound);