#!/usr/bin/env node

var express = require('express'),
   app = express(),
   config = require('config'),
   routes = require('./routes.js');

require('colors');

routes(app);

var port = config.port;

console.log('Starting'.grey, 'website'.yellow, 'on port'.grey, String(port).yellow, 'for'.grey, process.env.NODE_ENV.yellow );

app.listen(port);

