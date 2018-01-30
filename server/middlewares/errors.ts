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

  switch (err.message) {
    case 'not-found':
      err.status = 404;
      break;
    case 'access-denied':
      err.status = 403;
      break;
  }

  // if (err instanceof ServiceError && !isDevelopment) {
  //   return res.status((<any>err).status || 400).send({ message: err.message, data: err.data });
  // }

  next(err);
}