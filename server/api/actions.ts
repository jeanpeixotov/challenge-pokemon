import { NextFunction, Request, Response } from 'express';
import * as repository from './repository';
import * as service from './service';

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
    const result = await service.save(req.body);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function buy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await service.buy(req.params.name, req.params.quantity);
    res.status(result.status || 200).send(result.message || result);
  } catch (err) {
    next(err);
  }
}