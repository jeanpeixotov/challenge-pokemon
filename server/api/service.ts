import * as repository from './repository';
import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';
import { ServiceError } from '../errors/service';
import * as request from 'request';

export async function save(data: IPokemon): Promise<Pokemon> {
  const pokemon = await repository.findByName(data.name);
  return pokemon ? await update(pokemon.id, data) : await create(data);
}

async function create(data: IPokemon): Promise<Pokemon> {
  return await repository.insert(data);
}

async function update(id: number, data: IPokemon): Promise<Pokemon> {
  return await repository.update(id, data);
}

export async function buy(name: string, quantity: number): Promise<any> {
  const pokemon = await repository.findByName(name);

  if (!pokemon) throw new ServiceError('pokemon-not-found');
  if (pokemon.stock < quantity) throw new ServiceError(`Not enought ${pokemon.name} in stock: ${pokemon.stock}`);

  if (!await buyTransaction(pokemon, quantity)) {
    throw new ServiceError(`Pokemon: ${pokemon.name} not paid`);
  }
  pokemon.stock -= quantity;
  return await update(pokemon.id, pokemon);
}

async function buyTransaction(pokemon: Pokemon, quantity: number): Promise<boolean> {
  try {
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

    return result.status === 'paid';
  } catch (err) {
    throw new ServiceError(`Status: ${err.response.statusCode}, Message: ${err.response.body}`);
  }
}
