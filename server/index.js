const { app } = require('./app');

const PORT = 8080;

(async () => {
  app.listen(PORT, () => console.log(`
  node-express-sequelize listening at http://localhost:${PORT}
  `));
})();
