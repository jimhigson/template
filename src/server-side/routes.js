var express = require('express'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    env = process.env.NODE_ENV,
    development = (env == 'development'),

    SCRIPTS = ['js/chart.js'],
    STYLES = ['css/app.css'],

    CHART_TEMPLATE = fs.readFileSync('src/server-side/views/chart.partial.html');

module.exports = function routes(app) {

    app.use(express.static(__dirname + '../../../build/client-side'));


    app.get('/', function (req, res) {

        res.render('index', {
            scripts: SCRIPTS,
            stylesheets: STYLES,
            chartTemplate: CHART_TEMPLATE
        });
    });

    if (development) {
        app.use(express.static(__dirname + '/../client-side/bower_components'));
        app.use(express.static(__dirname + '/../client-side/js'));
        app.use(express.static(__dirname + '/../client-side/img'));
    }

    app.engine('handlebars', consolidate.handlebars);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/views');
};

