module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "super_team_picker",
      username: "komal",
      password: "komal123"
    },
    migrations: {
      directory: "db/migrations"
    }
  }
};

