#!/usr/bin/env node

var express = require('express'),
   app = express(),
   config = require('config'),
   routes = require('./routes.js'),
   forecastRoutes = require('./forecast_route.js');

require('colors');

routes(app);
forecastRoutes(app);

var port = config.port;

console.log('Starting'.grey, 'website'.yellow, 'on port'.grey, String(port).yellow, 'for'.grey, process.env.NODE_ENV.yellow );

app.listen(port);

