import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';

export async function list(): Promise<Pokemon[]> {
  return await Pokemon.query();
}

export async function insert(data: IPokemon): Promise<Pokemon> {
  return await Pokemon.query().insert(data).returning('*');
}

export async function update(id: number, data: IPokemon): Promise<Pokemon> {
  return await Pokemon.query().patchAndFetchById(id, data);
}

export async function findByName(name: string): Promise<Pokemon> {
  return await Pokemon.query().where({ name }).first();
}