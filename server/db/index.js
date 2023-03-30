const Sequelize = require('sequelize');

const DB_NAME = 'crimewatch';
const DB_USER = 'root';
const DB_PASS = '';

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    dialect: 'mysql',
  },
);

// const Report = sequelize.define('Report', {
//   type: Sequelize.STRING, // Type of report
//   location: Sequelize.STRING, // Location of report
//   time: Sequelize.STRING, // Time of report
//   zip: Sequelize.BIGINT, // Zipcode of report
//   description: Sequelize.STRING, // Description of report
//   alert: Sequelize.BOOLEAN, // Should display on alert on timeline
// });

const IncidentReport = sequelize.define('IncidentReport', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  address: Sequelize.STRING,
  zipcode: Sequelize.STRING,
  state: Sequelize.STRING,
  city: Sequelize.STRING,
  incident_type: Sequelize.STRING,
  description: Sequelize.STRING,
});

module.exports = {
  IncidentReport,
};
