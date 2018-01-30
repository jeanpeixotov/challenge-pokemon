import { IPokemon } from '../interfaces/pokemon';
import { Transaction } from 'objection';
import { Pokemon } from '../models/pokemon';

export async function list(): Promise<Pokemon[]> {
  return await Pokemon.query();
}

export async function insert(data: IPokemon, transaction: Transaction = null): Promise<Pokemon> {
  return await Pokemon.query(transaction).insert(data);
}

export async function update(data: IPokemon, transaction: Transaction = null): Promise<Pokemon> {
  return await Pokemon.query(transaction).patchAndFetchById(data.name, data);
}

export async function findByName(name: string): Promise<Pokemon> {
  return await Pokemon.query().where({ name }).first();
}