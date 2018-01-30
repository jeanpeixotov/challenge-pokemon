import * as repository from './repository';
import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';
import { knex } from '../db';
import { Transaction } from 'objection';
import { transaction } from 'objection';
import { ServiceError } from '../errors/service';
import * as request from 'request';

export async function save(pokemon: IPokemon): Promise<Pokemon> {

  return await transaction<Pokemon>(await knex(), async transaction => {
    return pokemon.name ? await update(pokemon, transaction) : await create(pokemon, transaction);
  });
}

async function create(data: IPokemon, transaction: Transaction): Promise<Pokemon> {
  return await repository.insert(data);
}

async function update(data: IPokemon, transaction: Transaction): Promise<Pokemon> {
  return await repository.update(data);
}

export async function buy(name: string, quantity: number): Promise<any> {
  const pokemon = await repository.findByName(name);

  if (!pokemon) throw new ServiceError('pokemon-not-found');
  if (pokemon.stock < quantity) throw new ServiceError(`Not enought ${pokemon.name} in stock: ${pokemon.stock}`);

  return await transaction<any>(await knex(), async transaction => {
    const result = await buyTransaction(pokemon, quantity);
    return result.name ? await update(pokemon, transaction) : result;
  });
}

async function buyTransaction(pokemon: IPokemon, quantity: number): Promise<any> {

  const result = await request({
    uri: 'https://api.pagar.me/1/transactions',
    method: 'POST',
    json: {
      api_key: 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg',
      amount: pokemon.price * quantity * 100,
      card_number: '4024007138010896',
      card_expiration_date: '1050',
      card_holder_name: 'Ash Ketchum',
      card_cvv: '123',
      metadata: {
        product: 'pokemon',
        name: pokemon.name,
        quantity
      }
    }
  });

  result.catch(err => {
    return {
      status: err.response.statusCode,
      message: err.response.body
    };
  });

  if (result.status === 'paid') {
    pokemon.stock = pokemon.stock - quantity;
  }
  return pokemon;
}
