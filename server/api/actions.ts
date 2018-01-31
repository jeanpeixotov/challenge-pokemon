import { NextFunction, Request, Response } from 'express';
import * as repository from './repository';
import * as service from './service';
import { validate as buyValidation } from './validators/buy';
import { validate as saveValidation } from './validators/save';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const pokemons = await repository.list();
    res.status(200).send(pokemons);
  } catch (err) {
    next(err);
  }
}

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await saveValidation(req.body);
    const result = await service.save(model);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function buy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await buyValidation(req.body);
    const result = await service.buy(model.name, model.quantity);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}