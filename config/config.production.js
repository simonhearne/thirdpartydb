module.exports = {
    isTest: false,
    server: {
      port: 80,
      host: 'localhost'
    },
    mysql: {
        host: DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DBNAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    }
  };