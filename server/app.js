const express = require('express');
const path = require('path');
const { Reports } = require('./routes/reports');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api/reports', Reports);

module.exports = {
  app,
};
