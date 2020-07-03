exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", table => {
      table.increments("id");
      table.text("imgURL");
      table.string("name");
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohorts');
  };