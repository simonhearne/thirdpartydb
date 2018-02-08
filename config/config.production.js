module.exports = {
    isTest: false,
    server: {
      port: 8080,
      host: 'thirdpartydb.appspot.com'
    },
    mysql: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DBNAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    swagger: 'swagger.production.json'
  };