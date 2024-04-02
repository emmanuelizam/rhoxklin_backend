// ensure that you modify MySQLConnectionOptions anytime you are changing database
const database_development = {
  username: "user1",
  password: null,
  database: "database_development",
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const database_rhoxklin = {
  username: "user1",
  password: null,
  database: "database_rhoxklin",
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const dababase_test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const database_production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const MySQLConnectionOptions = {
  user: "user1",
  password: null,
  database: "database_rhoxklin",
  host: "127.0.0.1",
  port: 3306,
};

const MySQLSessionStoreOptions = {
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 900000,
  // The maximum age of a valid session; milliseconds:
  expiration: 86400000,
  // Whether or not to create the sessions database table, if one does not already exist:
  createDatabaseTable: true,
  // Whether or not to end the database connection when the store is closed.
  // The default value of this option depends on whether or not a connection was passed to the constructor.
  // If a connection object is passed to the constructor, the default value for this option is false.
  endConnectionOnClose: true,
  // Whether or not to disable touch:
  disableTouch: false,
  charset: "utf8mb4_bin",
  schema: {
    tableName: "sessions_table",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};

module.exports = {
  database_development,
  dababase_test,
  database_production,
  MySQLConnectionOptions,
  MySQLSessionStoreOptions,
  database_rhoxklin,
};
