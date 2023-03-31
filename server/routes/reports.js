const { Router } = require('express');
const { IncidentReport } = require('../db');

const IncidentReports = Router();

IncidentReports.get('/', (req, res) => {
  IncidentReport.findAll()
    .then((reports) => {
      res.status(200);
      res.send(reports);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

IncidentReports.post('/', (req, res) => {
  const { report } = req.body;

  IncidentReport.create(report)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = {
  IncidentReports,
};
