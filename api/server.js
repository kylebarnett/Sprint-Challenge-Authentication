const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const db = require('../database/dbConfig.js');

const server = express();

const KnexSessionStore = connectSessionKnex(session)

const sessionConfig = {
  name: 'sprint challenge',
  // Never hard code the secret
  secret: 'sprint',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
