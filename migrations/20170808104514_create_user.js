
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('user', function(table) {
        table.increments('id').unsigned().primary();
        table.string('username').unique().notNull();
        table.string('password_digest');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
