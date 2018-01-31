import { joi, validateAsPromise } from '../../joi.config';

const schema = joi.object().keys({
  name: joi.string().required(),
  quantity: joi.number().integer().required()
});

export function validate(model: any): Promise<{ name: string, quantity: number }> {
  return validateAsPromise<{ name: string, quantity: number }>(model, schema);
}
