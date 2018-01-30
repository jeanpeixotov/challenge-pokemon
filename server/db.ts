import * as Knex from 'knex';
import * as objection from 'objection';
import * as settings from './settings';
import { ServiceError } from './errors/service';

// tslint:disable-next-line
const knexConfig = require('../knexfile');

export function connect(config: Knex.Config = null): Knex {
  const connection = Knex(config || knexConfig[settings.env]);
  objection.Model.knex(connection);

  return connection;
}

export async function connectAndMigrate(): Promise<Knex> {
  const connection = connect();

  await connection.migrate.latest();
  await connection.seed.run();

  return connection;
}

export async function knex(): Promise<Knex> {
  const knexInstance = await connectAndMigrate();
  if (!knexInstance) throw new ServiceError('knex-not-connected');
  return knexInstance;
}