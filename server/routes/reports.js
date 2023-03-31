const { Router } = require('express');
const { Report } = require('../db');

const Reports = Router();

Reports.get('/', (req, res) => {
  Report.findAll({})
    .then((reports) => {
      res.status(200);
      res.send(reports);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

Reports.post('/', (req, res) => {
  const { report } = req.body;

  Report.create(report)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = {
  Reports,
};
