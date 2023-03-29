const { app } = require('./app');

const PORT = 8080;

(async () => {
  app.listen(PORT, () => console.log(`
  listening at ${PORT}
  `));
})();
