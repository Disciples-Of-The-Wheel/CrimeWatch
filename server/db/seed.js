const { IncidentReport } = require('./index');

(async () => {
  await IncidentReport.sync({ force: true });
  console.log('IncidentReport table created');
})();
