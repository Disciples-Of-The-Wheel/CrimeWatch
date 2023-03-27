const { Router } = require('express');
const { Report } = require('../db');

const Reports = Router();

Reports.get('/', (req, res) => {
  // Use the Report model to interact with the reports table of the db
  // Find the squelize method for searching a table
  Report.findAll()
    // If successful, 200 status code + respod with data
    .then((reports) => {
      res.status(200);
      res.send(reports);
    })
    // If not, 500 status code + log the error
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
