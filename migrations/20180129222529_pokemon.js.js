exports.up = function (knex) {
  return knex.schema.createTable('pokemon', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.integer('price').notNullable();
    table.integer('stock').nullable().defaultTo(1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('pokemon')
};