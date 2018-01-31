import { joi, validateAsPromise } from '../../joi.config';
import { IPokemon } from '../../interfaces/pokemon';
const schema = joi.object().keys({
  name: joi.string().required().max(150),
  price: joi.number().integer().required().min(0),
  stock: joi.number().integer().allow(null).min(0).default(1)
});

export function validate(model: any): Promise<IPokemon> {
  return validateAsPromise<IPokemon>(model, schema);
}
