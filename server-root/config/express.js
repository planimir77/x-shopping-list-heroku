const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const cookieSecret = process.env.COOKIESECRET;
const config = require('./config');
const apiRouter = require('../router');
const { errorHandler } = require('../utils')

module.exports = (app) => {
    // Create link to Angular build directory
    const distDir = __basedir + "/dist/x-shopping-list/";
    app.use(express.static(distDir));

    app.use(express.json());

    app.use(cookieParser(cookieSecret));

    app.use(session({
        secret: cookieSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: true,
            sameSite: true,
            httpOnly: true,
        }
    }));

    app.use(express.static(path.resolve(__basedir, 'static')));

    console.log('Origin : '+ config.origin);

    app.use(cors({
        origin: config.origin,
        credentials: true
    }));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, access-control-allow-origin');
        next();
      });

    app.use('/api', apiRouter);

    app.get('/*', (_req, res) => { res.sendFile(path.join(distDir, 'index.html')); });

    app.use(errorHandler);
};
