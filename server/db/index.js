const Sequelize = require('sequelize');

const DB_NAME = 'crimewatch';
const DB_USER = 'root';
const DB_PASS = 'root';

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    dialect: 'mysql',
  },
);

const Report = sequelize.define('Report', {
  type: Sequelize.STRING, // Type of report
  location: Sequelize.STRING, // Location of report
  time: Sequelize.STRING, // Time of report
  zip: Sequelize.BIGINT, // Zipcode of report
  description: Sequelize.STRING, // Description of report
  alert: Sequelize.BOOLEAN, // Should display on alert on timeline
});

module.exports = {
  Report,
};
