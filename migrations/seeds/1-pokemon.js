exports.seed = async function (knex) {
  const count = await knex.count('id as count').from('pokemon').first();
  if (count > 0) return;

  await knex.insert({
    name: 'Pikachu',
    price: 10,
    stock: 1
  }).returning('*').into('pokemon');
}