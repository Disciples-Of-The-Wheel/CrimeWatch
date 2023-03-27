const { Report } = require('./index');

(async () => {
  await Report.sync({ force: true });
  console.log('Reports table created');
})();
