var express = require('express'),
    consolidate = require('consolidate'),
    env = process.env.NODE_ENV,
    development = (env == 'development'),

    SCRIPTS = ['js/chart.js'],
    STYLES = development ? ['css/main.css'] : ['css-min/all.css'];

module.exports = function routes(app) {

    app.use(express.static(__dirname + '../../../build/client-side'));


    app.get('/', function (req, res) {

        res.render('index', {
            scripts: SCRIPTS,
            stylesheets: STYLES
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

