exports.up = function (knex) {
  return knex.schema.createTable('pokemon', function (table) {
    table.increments('id');
    table.string('name').notNullable().primary();
    table.integer('price').notNullable();
    table.integer('stock').nullable().defaultTo(1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('pokemon')
};