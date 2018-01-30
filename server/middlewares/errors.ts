import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction): any {
  return res.status(404).json('Nenhum rota encontrada');
}

export function parser(err: any, req: Request, res: Response, next: NextFunction): any {
  if (err.validationError) {
    console.log(req.body);
    console.log(err.message);
    return res.status(400).json(err.message);
  }

  next(err);
}