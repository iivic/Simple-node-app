
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('bear', function(table) {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('bear');
};
