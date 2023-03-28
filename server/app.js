const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');
const passportSetup = require('./passport');
const { Reports } = require('./routes/reports');
const passport = require('passport');
const authRoute = require('./routes/auth');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api/reports', Reports);
app.use(cookieSession(
  {
    name: 'session',
    keys: ['crimewatch'],
    maxAge: 24 * 60 * 60 * 100,
  },
));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use('/auth', authRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

module.exports = {
  app,
};
